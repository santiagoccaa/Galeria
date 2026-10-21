'use client'

import CardPurchase from "@/components/CardPurchase/CardPurchase"
import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { X } from "lucide-react"

interface Compra {
    id: string;
    articleId: string;
    createdAt: string;
    mercadoPagoPaymentId: string;
    price: number;
    productName: string;
    quantity: number;
    userId: string;
    article: {
        imageUrl: string;
    };
}

function SuccessContent() {
    const params = useSearchParams()

    const collectionId = params.get("collection_id")

    const [compra, setCompra] = useState<Compra | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!collectionId) {
            setError("No se encontró el identificador de la compra.")
            setLoading(false)
            return
        }

        const getCompra = async () => {
            try {
                const { data } = await axios.get(
                    `/api/purchases/${collectionId}`
                )

                setCompra(data)
            } catch (error) {
                console.error("ERROR GET PURCHASE:", error)
                setError("No se pudo encontrar la compra.")
            } finally {
                setLoading(false)
            }
        }

        getCompra()
    }, [collectionId])

    if (loading) {
        return (
            <div>
                Cargando compra...
            </div>
        )
    }
    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-4">
                <div className="w-full max-w-md rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <X className="h-6 w-6 text-red-600" />
                    </div>

                    <h2 className="text-xl font-semibold text-slate-900">
                        No pudimos encontrar tu compra
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                        {error}
                    </p>

                    <Button
                        nativeButton={false}
                        render={
                            <Link href="/articulos">
                                Volver a la tienda
                            </Link>
                        }
                        className="mt-6"
                    />
                </div>
            </div>
        )
    }
    if (!compra) {
        return (
            <div>
                No se encontró la información de la compra.
            </div>
        )
    }

    return (
        <div className="container mx-auto px-2 md:px-4 lg:px-12 flex-1 h-full pt-8 space-y-4">
            <CardPurchase
                articleId={compra.articleId}
                createdAt={compra.createdAt}
                mercadoPagoPaymentId={compra.mercadoPagoPaymentId}
                price={compra.price}
                productName={compra.productName}
                quantity={compra.quantity}
            />
        </div>
    )
}

export default function Success() {
    return (
        <Suspense fallback={<div>Cargando compra...</div>}>
            <SuccessContent />
        </Suspense>
    )
}