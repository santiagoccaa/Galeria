'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Reseipt } from "./components";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Receipt } from "lucide-react";

type MetricasPageProps = {
    productosAgrupados: {
        id: string
        name: string
        category: string
        quantity: number
        total: number
        createdAt: Date
        mercadoPagoPaymentId: string
    }[]
}

export const MetricasPage = ({
    productosAgrupados
}: MetricasPageProps) => {

    const [idPurchase, setIdPurchase] = useState('')
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className="space-y-4">

                <div>
                    <h2 className="text-xl font-semibold">
                        Productos vendidos
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Resumen de los productos que han comprado tus clientes.
                    </p>
                </div>

                {productosAgrupados.length === 0 ? (

                    <div className="flex min-h-32 items-center justify-center">
                        <p className="text-sm text-white">
                            Aún no tienes productos vendidos.
                        </p>
                    </div>

                ) : (

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    Producto
                                </TableHead>

                                <TableHead>
                                    Categoría
                                </TableHead>

                                <TableHead>
                                    Fecha
                                </TableHead>

                                <TableHead className="text-center">
                                    Vendidos
                                </TableHead>

                                <TableHead className="text-right">
                                    Ingresos
                                </TableHead>

                                <TableHead className="text-right">
                                    Recibo
                                </TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {productosAgrupados.map((producto) => (

                                <TableRow key={producto.id}>

                                    <TableCell className="font-medium">
                                        {producto.name}
                                    </TableCell>

                                    <TableCell>
                                        {producto.category}
                                    </TableCell>

                                    <TableCell>
                                        {
                                            producto.createdAt.toLocaleDateString('es-CO')
                                        }
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {producto.quantity}
                                    </TableCell>

                                    <TableCell className="text-right font-medium">
                                        ${producto.total.toLocaleString("es-CO")}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button onClick={() => {
                                            setIdPurchase(producto.mercadoPagoPaymentId)
                                            setOpen(true)
                                        }} >
                                            <Receipt />

                                        </Button>
                                    </TableCell>
                                </TableRow>

                            ))}

                        </TableBody>
                    </Table>
                )}

            </div>
            <Reseipt
                id={idPurchase}
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}

