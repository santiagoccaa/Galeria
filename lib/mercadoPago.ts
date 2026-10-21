import "server-only"

import { MercadoPagoConfig } from "mercadopago"

function getMercadoPagoClient() {
    const accessToken = process.env.NEXT_PUBLIC_KEY_MERCADOPAGO_ACCESS_TOKEN

    if (!accessToken) {
        throw new Error("Falta MERCADOPAGO_ACCESS_TOKEN")
    }

    return new MercadoPagoConfig({ accessToken })
}

export const client = getMercadoPagoClient()