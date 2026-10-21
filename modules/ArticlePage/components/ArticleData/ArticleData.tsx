'use client'

import { IoBagOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { ImageProduct } from "@/components/ImageProduct";
import { Input } from "@/components/ui/input";
import { MdImageNotSupported } from "react-icons/md";
import { Payments } from "../Payments";
import { PurchaseProduct } from "@/types";
import { useState } from "react";

export const ArticleData = ({ description, imageUrl, name, price, stock, id }: PurchaseProduct) => {
    const [cantidad, setCantidad] = useState(1)

    return (
        <div className="flex items-center gap-8">
            <section className="w-1/2" data-purpose="product-image-viewer">
                <ImageProduct
                    alt="A minimalist modern decorative gray leather textured wall art framed piece on an elegant neutral architectural wall in a stylish luxury interior home decor setting, soft lighting, premium gallery aesthetic"
                    src={imageUrl} />
            </section>
            <section className="w-1/2 flex flex-col" data-purpose="product-purchase-hub">
                <div className="border-b border-salvia-200/90 pb-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        {stock <= 0 ? (
                            <div
                                className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-800 text-xs font-medium">
                                <span className="w-2 h-2 rounded-full bg-red-500 badge-pulse"></span>
                                <span>Stock: {stock} agotado</span>
                            </div>
                        ) : (
                            <div
                                className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 badge-pulse"></span>
                                <span>Stock: {stock} disponibles</span>
                            </div>
                        )}

                    </div>
                    <h1 className="text-3xl sm:text-4xl font-editorial font-normal tracking-tight text-salvia-950 mb-3">
                        {name}
                    </h1>
                    <div className="flex items-baseline space-x-3 mb-2">
                        <span className="text-3xl font-semibold tracking-tight text-salvia-950">${price.toLocaleString('es-CO')}</span>
                        <span className="text-xs font-semibold tracking-wider uppercase text-salvia-600">COP</span>
                    </div>
                </div>
                <div className="text-base text-salvia-700 leading-relaxed font-normal mb-8">
                    <p>
                        {description}
                    </p>
                </div>
                <div className="space-y-4 mb-8" data-purpose="cart-actions">
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-salvia-300 rounded-xl bg-salvia-50 px-2 py-1">
                            <Button
                                onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                aria-label="Disminuir cantidad"
                                className="w-8 h-8 bg-transparent"
                            >
                                <FaMinus />
                            </Button>

                            <Input
                                aria-label="Cantidad"
                                className="
        w-8 
        text-center 
        text-base 
        font-semibold 
        border-none 
        bg-transparent 
        focus:ring-0 
        p-0 
        text-salvia-900
        [appearance:textfield]
        [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none
    "
                                type="number"
                                value={cantidad}
                                min={1}
                                max={stock}
                                onChange={(e) => {
                                    const value = Number(e.target.value)

                                    if (value < 1) {
                                        setCantidad(1)
                                        return
                                    }

                                    if (value > stock) {
                                        setCantidad(stock)
                                        return
                                    }

                                    setCantidad(value)
                                }}
                            />

                            <Button
                                onClick={() => setCantidad(Math.min(stock, cantidad + 1))}
                                disabled={cantidad >= stock}
                                aria-label="Aumentar cantidad"
                                className="w-8 h-8 bg-transparent"
                            >
                                <FaPlus />
                            </Button>
                        </div>
                        {/* BUTTON PARA IR A COMPRAR */}
                        <Payments
                            cantidad={cantidad}
                            productId={id}
                            disabled={stock <= 0 ? true : false}
                        />
                    </div>
                    <Button
                        disabled={stock <= 0 ? true : false}
                        className="w-full bg-amber-400 hover:bg-amber-500 h-10 text-black font-bold"
                        type="button">
                        <IoBagOutline />
                        <span>Añadir a la bolsa</span>
                    </Button>
                </div>
            </section>
        </div>
    )
}

