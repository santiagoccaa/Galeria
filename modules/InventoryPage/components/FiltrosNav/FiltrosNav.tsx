"use client"

import { usePathname } from 'next/navigation'
import { Search } from '../Search'
import { SelectCategory } from '../SelectCategory'
import { Buttons } from '@/modules/MisProductos/components'

export const FiltrosNav = () => {

    const pathName = usePathname()

    const showFilters = pathName.includes('preId')

    if (showFilters) return

    return (
        <div className="flex justify-between w-full">
            <div className="flex gap-8 items-center">
                <Search />
                <SelectCategory />
            </div>
            <Buttons />
        </div>
    )
}

