"use client"

import { useFilteredArticles } from '@/hooks/useFilteredArticles '
import { ListArticles } from '../InventoryPage/components'

export const MisProductos = () => {

    const articles = useFilteredArticles()
    return (
        <>
            <ListArticles
                articles={articles}
                actions={true}
            />
        </>
    )
}
