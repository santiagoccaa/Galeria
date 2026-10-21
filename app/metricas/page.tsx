import prisma from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

import { Package, ShoppingBag } from "lucide-react"
import { MetricasPage } from "@/modules/MetricasPage"

export default async function Metricas() {

    const user = await currentUser()

    if (!user) {
        return null
    }

    const compras = await prisma.purchasesUser.findMany({
        where: {
            article: {
                userId: user.id
            }
        },
        include: {
            article: {
                include: {
                    category: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    // Total de unidades vendidas
    const productosVendidos = compras.reduce(
        (total, compra) => total + compra.quantity,
        0
    )

    // Total de ingresos
    const ingresos = compras.reduce(
        (total, compra) => total + compra.price * compra.quantity,
        0
    )

    // Agrupar productos
    const productos = compras.reduce((acc, compra) => {

        const articleId = compra.articleId

        if (!acc[articleId]) {
            acc[articleId] = {
                id: articleId,
                name: compra.productName,
                category: compra.article.category.name,
                quantity: 0,
                total: 0,
                createdAt: compra.createdAt,
                mercadoPagoPaymentId: compra.mercadoPagoPaymentId
            }
        }

        acc[articleId].quantity += compra.quantity
        acc[articleId].total += compra.price * compra.quantity

        return acc

    }, {} as Record<string, {
        id: string
        name: string
        category: string
        quantity: number
        total: number
        createdAt: Date
        mercadoPagoPaymentId: string
    }>)

    const productosAgrupados = Object.values(productos)

    return (
        <div className="container mx-auto px-2 md:px-4 lg:px-12 flex-1 h-full pt-8 space-y-4">

            {/* Título */}
            <div className="flex justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Métricas
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        Resumen de las ventas de tus productos
                    </p>
                </div>
                {/* Métricas */}
                <div className="flex gap-4">
                    <Card className="py-4 w-70">
                        <CardContent className="flex items-center gap-3 px-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-salvia-100">
                                <Package className="size-8 text-salvia-700" />
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Productos vendidos
                                </p>

                                <p className="text-xl font-bold">
                                    {productosVendidos}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="py-4 w-70">
                        <CardContent className="flex items-center gap-3 px-4">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-salvia-100">
                                <ShoppingBag className="size-8 text-salvia-700" />
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Ingresos
                                </p>

                                <p className="text-xl font-bold">
                                    ${ingresos.toLocaleString("es-CO")}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
            </div>
            {/* Productos vendidos */}
            <MetricasPage productosAgrupados={productosAgrupados} />
        </div>
    )
}