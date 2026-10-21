"use client"

import { categories } from "@/data"
import { useArticles } from "@/store/useArticles"
import { useArticlesUser } from "@/store/useArticlesUser"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { getCategoryIcon, getCategoryVariant } from "@/components/ui"
import { Funnel, ListFilter } from "lucide-react"

export const SelectCategory = () => {
    const pathName = usePathname()
    const isMyProducts = pathName === '/inventario/mis-productos'

    const { setPage, setCategoryId, loading } = useArticles()

    const categoryName = useArticlesUser((s) => s.categoryName)
    const setCategoryName = useArticlesUser((s) => s.setCategoryName)

    const [categoryArticle, setCategoryArticle] = useState('')
    const [open, setOpen] = useState(false)

    const selectedId = isMyProducts
        ? categories.find((c) => c.name === categoryName)?.id ?? ''
        : categoryArticle

    const handleChange = (value: string) => {

        const id = value === 'todos' ? '' : value
        const item = categories.find((c) => c.id === id)

        if (isMyProducts) {
            setCategoryName(item?.name ?? '')
        } else {
            setCategoryArticle(id)
            setCategoryId(id)
            setPage(1)
        }

        setOpen(false)
    }

    const selectedName = categories.find((c) => c.id === selectedId)?.name

    return (

        <div className="flex gap-1 items-center">
            <DropdownMenu
                open={open}
                onOpenChange={setOpen}
            >
                <DropdownMenuTrigger
                    render={<Button className={"w-50 border border-white bg-transparent"} />}
                    disabled={loading}
                >
                    {selectedName ?? 'Todos'}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel
                            onClick={() => {
                                handleChange('')
                            }}
                        >
                            <Badge className="mr-1">
                                <ListFilter />

                            </Badge>
                            Todos

                        </DropdownMenuLabel>
                        {categories.map((item) => (
                            <DropdownMenuLabel
                                key={item.id}
                                onClick={() => {
                                    handleChange(item.id)
                                }}
                            >
                                <Badge variant={getCategoryVariant(item.name)} className="mr-1">
                                    {(() => {
                                        const Icon = getCategoryIcon(item.name)

                                        return <Icon className="size-4" data-icon="inline-end" />
                                    })()}
                                </Badge>
                                {item.name}

                            </DropdownMenuLabel>
                        ))}
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
            <Funnel className="size-6" />

        </div>
    )

}