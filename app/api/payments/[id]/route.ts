import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { Preference } from "mercadopago";
import { client } from "@/lib";
import { MetadataPurchase } from "@/types";

interface Params {
    params: Promise<{ id: string }>
}

export async function POST(req: Request, { params }: Params) {
    try {

        const { id } = await params
        const user = await currentUser()
        const { cantidad } = await req.json()

        if (!user) return NextResponse.json('Unathorized', { status: 401 })

        // Validar antes de consultar o modificar stock.
        if (!Number.isSafeInteger(cantidad) || cantidad <= 0) {
            return NextResponse.json(
                { error: "Cantidad inválida" },
                { status: 400 },
            )
        }

        const order = await prisma.$transaction(async (tx) => {
            const product = await tx.articles.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    price: true,
                },
            })

            if (!product) {
                throw new Error("PRODUCT_NOT_FOUND")
            }

            const reserved = await tx.articles.updateMany({
                where: {
                    id,
                    stock: { gte: cantidad },
                },
                data: {
                    stock: { decrement: cantidad },
                },
            })

            if (reserved.count !== 1) {
                throw new Error("INSUFFICIENT_STOCK")
            }

            return tx.orders.create({
                data: {
                    articlesId: id,
                    userId: user.id,
                    quantity: cantidad,
                    productName: product.name,
                    unitPrice: product.price,
                    status: "RESERVED",
                    expiresAt: new Date(Date.now() + 15 * 60 * 1000),
                    mercadoPagoPaymentId: ""
                },
            })
        })

        const preference = new Preference(client);

        const response = await preference.create({
            body: {
                items: [
                    {
                        id: order.articlesId,
                        title: order.productName,
                        quantity: order.quantity,
                        unit_price: Number(order.unitPrice),

                    },
                ],
                back_urls: {
                    success: "https://4gt2nw8v-3000.use2.devtunnels.ms/pago/success",
                    failure: "https://4gt2nw8v-3000.use2.devtunnels.ms/pago/failure",
                    pending: "https://4gt2nw8v-3000.use2.devtunnels.ms/pago/pending"
                },
                auto_return: "approved",

                metadata: {
                    order_id: order.id,
                }
            },
        });

        return NextResponse.json(response.init_point, { status: 200 })

    } catch (error) {
        console.error("Error creando orden:", error)

        return NextResponse.json(
            {
                error: "Error creando la orden",
            },
            {
                status: 500,
            }
        )
    }
}