"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    CheckCircle2,
    CreditCard,
    Package,
    CalendarDays,
    Hash,
} from "lucide-react"

interface ReceiptData {
    id: number
    status: string
    status_detail: string
    transaction_amount: number
    currency_id: string
    date_approved: string
    description: string
    payment_method_id: string
    payment_type_id: string
    installments: number
    card?: {
        last_four_digits: string
        first_six_digits: string
        cardholder?: {
            name: string
        }
    }
    payer: {
        email: string
    }
    metadata: {
        quantity: number
        price: number
        name: string
        user_purchase_id: string
    }
}

interface ReseiptProps {
    id: string
    open: boolean
    setOpen: (open: boolean) => void
}

export const Reseipt = ({ id, open, setOpen }: ReseiptProps) => {

    const [receiptData, setReceiptData] = useState<ReceiptData | null>(null)

    const getReceipt = async () => {
        try {
            const { data } = await axios.get(`/api/purchases/receipt/${id}`)
            setReceiptData(data)
        } catch (error) {
            console.error("Error obteniendo recibo:", error)
        }
    }

    useEffect(() => {
        if (id) {
            getReceipt()
        }
    }, [id])

    const formatPrice = (value: number) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
        }).format(value)
    }

    const formatDate = (date: string) => {
        return new Intl.DateTimeFormat("es-CO", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(date))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>

                {!receiptData ? (
                    <div className="p-8 text-center">
                        <p className="text-sm text-slate-500">
                            Cargando recibo...
                        </p>
                    </div>
                ) : (
                    <>
                        {/* Header */}
                        <div className="bg-salvia-900">
                            <DialogHeader>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                                        <CheckCircle2 className="h-6 w-6" />
                                    </div>

                                    <div>
                                        <DialogTitle className="text-lg">
                                            Compra realizada
                                        </DialogTitle>

                                        <DialogDescription>
                                            Pago aprobado correctamente
                                        </DialogDescription>
                                    </div>
                                </div>
                            </DialogHeader>
                        </div>

                        {/* Receipt */}
                        <div className="space-y-5">

                            {/* Product */}
                            <div className="rounded-xl border p-4 hidden">
                                <div className="flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border">
                                        <Package className="h-5 w-5 text-slate-600" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-900 truncate">
                                            {receiptData.metadata.name}
                                        </p>

                                        <p className="text-sm text-slate-500">
                                            Cantidad: {receiptData.metadata.quantity}
                                        </p>
                                    </div>

                                    <p className="font-semibold text-slate-900">
                                        {formatPrice(receiptData.transaction_amount)}
                                    </p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-3">

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">
                                        Precio unitario
                                    </span>

                                    <span className="font-medium">
                                        {formatPrice(receiptData.metadata.price)}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-500">
                                        Cantidad
                                    </span>

                                    <span className="font-medium">
                                        {receiptData.metadata.quantity}
                                    </span>
                                </div>

                                <div className="border-t pt-3 flex items-center justify-between">
                                    <span className="font-semibold text-slate-900">
                                        Total
                                    </span>

                                    <span className="text-xl font-bold text-salvia-900">
                                        {formatPrice(receiptData.transaction_amount)}
                                    </span>
                                </div>

                            </div>

                            {/* Payment information */}
                            <div className="rounded-xl border p-4 space-y-3">

                                <p className="text-sm font-semibold text-slate-900">
                                    Información del pago
                                </p>

                                <div className="flex items-center gap-3">
                                    <CreditCard className="h-4 w-4 text-slate-400" />

                                    <div className="text-sm">
                                        <p className="text-slate-500">
                                            Método de pago
                                        </p>

                                        <p className="font-medium capitalize">
                                            {receiptData.payment_type_id.replace(
                                                "_",
                                                " "
                                            )}
                                            {receiptData.card?.last_four_digits && (
                                                <> •••• {receiptData.card.last_four_digits}</>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <CalendarDays className="h-4 w-4 text-slate-400" />

                                    <div className="text-sm">
                                        <p className="text-slate-500">
                                            Fecha
                                        </p>

                                        <p className="font-medium">
                                            {formatDate(receiptData.date_approved)}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Hash className="h-4 w-4 text-slate-400" />

                                    <div className="text-sm">
                                        <p className="text-slate-500">
                                            Número de pago
                                        </p>

                                        <p className="font-medium">
                                            {receiptData.id}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Status */}
                            <div className="flex items-center justify-center gap-2 rounded-lg bg-green-50 py-2.5 text-sm font-medium text-green-700">
                                <CheckCircle2 className="h-4 w-4" />
                                Pago aprobado
                            </div>

                        </div>
                    </>
                )}

            </DialogContent>
        </Dialog>
    )
}

