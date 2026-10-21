import { NextResponse } from "next/server"
import { Payment } from "mercadopago"
import { client } from "@/lib"
import prisma from "@/lib/prisma"
import { MetadataPurchase } from "@/types"

export async function POST(req: Request) {
    try {
        const body: { data: { id: string } } = await req.json()

        const paymentId = body.data.id

        const payment = new Payment(client)

        const response = await payment.get({
            id: paymentId
        })

        if (response.status != "approved") {
            console.error('❗ ERROR GET PAYMENT', response.status, response.metadata)
            return NextResponse.json(response.metadata, { status: 500 })
        }

        const metadata = response.metadata
        const { order_id } = metadata

        const order = await prisma.orders.findFirst({
            where: {
                id: order_id
            }
        })

        if (!order) {
            return NextResponse.json(
                { error: "ORDER_NOT_FOUND" },
                { status: 404 },
            )
        }

        const confirmed = await prisma.orders.updateMany({
            where: {
                id: order.id,
                status: "RESERVED",
            },
            data: {
                status: "PAYD",
                mercadoPagoPaymentId: paymentId,
            },
        })

        if (confirmed.count === 1) {
            await prisma.purchasesUser.create({
                data: {
                    price: order.unitPrice,
                    productName: order.productName,
                    quantity: order.quantity,
                    userId: order.userId,
                    articleId: order.articlesId,
                    mercadoPagoPaymentId: paymentId,
                },
            })
        }

        return NextResponse.json(
            { received: true },
            { status: 200 }
        )

    } catch (error) {
        console.error("Error procesando webhook:", error)

        return NextResponse.json(
            { error: "Error procesando webhook" },
            { status: 400 }
        )
    }
}