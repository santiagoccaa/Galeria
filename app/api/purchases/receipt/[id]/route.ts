import { client } from "@/lib"
import { Payment } from "mercadopago"
import { NextResponse } from "next/server"
interface Params {
    params: Promise<{ id: string }>
}

export async function GET(req: Request, { params }: Params) {
    try {
        const { id } = await params
        const payment = new Payment(client)

        const response = await payment.get({
            id
        })

        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        console.error("[/api/purchases/receipt]", error)
        return NextResponse.json('NO_FOUND_RECEIPT', { status: 500 })

    }
}