"use client"

import { ListArticles } from './components'
import { PaginationArticles } from './components/Pagination'
import { useArticles } from '@/store/useArticles'

export const InventoryPage = () => {

    const { articles } = useArticles()

    return (
        <>
            <ListArticles
                articles={articles}
            />

            <PaginationArticles/>
        </>
    )
}
