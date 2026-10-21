"use client"

import Image from "next/image"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { FaImage } from "react-icons/fa6";

interface ProductImageProps {
    src: string
    alt: string
}

export const ImageProduct = ({ src, alt }: ProductImageProps) => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="relative min-w-100 aspect-square overflow-hidden rounded-sm">

            {isLoading && (
                <Skeleton className="absolute inset-0 flex items-center justify-center size-full">
                    <FaImage className="size-40" />
                </Skeleton>
            )}

            <Image
                src={src}
                alt={alt}
                fill
                
                className={`aspect-square object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] ${isLoading ? "opacity-0" : "opacity-100"
                    }`}
                onLoad={() => setIsLoading(false)}
            />
        </div>
    )
}