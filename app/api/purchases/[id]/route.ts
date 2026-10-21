import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

interface Params {
    params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: Params) {
    try {
        const { id } = await params

        const article = await prisma.purchasesUser.findUnique({
            where: {
                mercadoPagoPaymentId: id
            }
        })

        return NextResponse.json(article, { status: 200 })

    } catch (error) {
        console.log("GET PURCHASE BY ID:", error)
        return NextResponse.json(null, { status: 500 })
    }
}