import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { CalendarDays, CreditCard } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CardPurchaseProps {
    createdAt: string
    productName: string
    quantity: number
    mercadoPagoPaymentId: string
    articleId: string
    price: number
}

const CardPurchase = ({ createdAt, productName, quantity, articleId, mercadoPagoPaymentId, price }: CardPurchaseProps) => {

    const total = price * quantity

    return (
        <Card className="overflow-hidden">

            <CardHeader className="border-b bg-muted/30">

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="size-4" />

                        <span>
                            {new Intl.DateTimeFormat("es-CO", {
                                dateStyle: "long"
                            }).format(new Date(createdAt))}
                        </span>
                    </div>

                    <Badge>
                        Compra realizada
                    </Badge>

                </div>

            </CardHeader>

            <CardContent className="p-5">

                <div className="flex flex-col gap-5 sm:flex-row">

                    {/* Imagen */}
                    <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-muted sm:size-28">
                        <Image
                            src={"/salas/home.jpg"}
                            alt={productName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Información */}
                    <div className="flex flex-1 flex-col justify-between gap-4">

                        <div>
                            <h2 className="text-lg font-semibold">
                                {productName}
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                {quantity}{" "}
                                {quantity === 1 ? "unidad" : "unidades"}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Precio unitario
                                </p>

                                <p className="mt-1 font-medium">
                                    ${price.toLocaleString("es-CO")}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Cantidad
                                </p>

                                <p className="mt-1 font-medium">
                                    {quantity}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Total
                                </p>

                                <p className="mt-1 text-lg font-bold">
                                    ${total.toLocaleString("es-CO")}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="my-5">
                    <div className="h-px bg-border" />
                </div>

                {/* Información del pago */}
                <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <CreditCard className="size-4" />

                        <span>
                            Pago #{mercadoPagoPaymentId}
                        </span>
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        nativeButton={false}
                        render={
                            <Link href={`/inventario/${articleId}`}>
                                Ver producto
                            </Link>
                        }
                    />

                </div>

            </CardContent>

        </Card>
    )
}

export default CardPurchase
