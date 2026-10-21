"use client"

import { Button } from "@/components/ui/button"
import { AddProduct } from "@/modules/InventoryPage/components"
import { Eraser, UserSearch } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Buttons = () => {

    const pathName = usePathname()
    const misProductsPage = pathName === '/inventario/mis-productos'

    return (
        <div className='flex gap-2 items-center'>
            {misProductsPage && <AddProduct />}
            <Button
                nativeButton={false}
                render={
                    !misProductsPage ?
                        <Link href={`/inventario/mis-productos`} />
                        :
                        <Link href={`/inventario`} />
                }
            >
                {!misProductsPage ? <UserSearch /> : <Eraser />}
                {!misProductsPage ? 'Mis arcitulos' : 'Mostrar todos'}
            </Button>
        </div>
    )
}

