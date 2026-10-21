"use client"

import { Input } from "@/components/ui/input"
import { useArticles } from "@/store/useArticles"
import { useArticlesUser } from "@/store/useArticlesUser"
import { LoaderCircle, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"

export const Search = () => {
    const pathName = usePathname()
    const isMyProducts = pathName === '/inventario/mis-productos'

    const { setSearch, setPage, loading } = useArticles()
    const { searchTerm, setSearchTerm } = useArticlesUser()

    const [nameArticle, setNameArticle] = useState('')

    const handleChange = (value: string) => {
        if (isMyProducts) {
            setSearchTerm(value)
        } else {
            setNameArticle(value)
            setSearch(value)
            setPage(1)
        }
    }

    const value = (isMyProducts ? searchTerm : nameArticle) ?? ''

    return (
        <div className="relative">
            <Input
                value={value}
                placeholder="Buscar productos"
                className="w-80 pr-10"
                disabled={loading}
                onChange={(e) => handleChange(e.target.value)}

            />
            {loading &&
                <LoaderCircle className="absolute top-1/2 -translate-y-1/2 right-2 pointer-events-none size-4 text-muted-foreground animate-spin z-10" />
            }

            {value.trim().length > 0 && !loading &&
                <button
                    className="absolute top-1/2 -translate-y-1/2 right-2 size-4 text-muted-foreground cursor-pointer rounded-full flex items-center justify-center"
                    onClick={() => {
                        if (isMyProducts) {
                            setSearchTerm('')
                        } else {
                            setNameArticle('')
                            setSearch('')
                            setPage(1)
                        }
                    }}
                >
                    <X className="size-10" strokeWidth={3} color="white" />
                </button>
            }
        </div>
    )
}
