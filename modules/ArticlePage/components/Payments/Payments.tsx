'use client'

import { Button } from "@/components/ui/button"
import axios from "axios"
import { FaArrowRightLong } from "react-icons/fa6"

interface PaymentsProps {
    productId: string
    cantidad: number
    disabled: boolean
}
export const Payments = ({ productId, cantidad, disabled }: PaymentsProps) => {


    const createPSEPayment = async () => {
        const { data } = await axios.post(`/api/payments/${productId}`, { cantidad })
        // console.log(data)
        window.location.href = data
    }
    return (
        <Button
            disabled={disabled}
            onClick={createPSEPayment}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 h-10"
            data-purpose="buy-now-button">
            <span>Comprar ahora</span>
            <FaArrowRightLong />
        </Button>
    )
}
