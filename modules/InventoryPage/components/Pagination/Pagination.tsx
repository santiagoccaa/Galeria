'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useArticles } from "@/store/useArticles"
import { useArticlesUser } from "@/store/useArticlesUser"

export const PaginationArticles = () => {

    const { page, totalPages, setPage, loading } = useArticles()
    const { currentPage, setCurrentPage } = useArticlesUser()

    if (totalPages <= 1) return null

    const getPages = () => {

        if (totalPages <= 5) {
            return Array.from(
                { length: totalPages },
                (_, index) => index + 1
            )
        }

        if (page <= 3) {
            return [1, 2, 3, 'ellipsis', totalPages]
        }

        if (page >= totalPages - 2) {
            return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
        }

        return [
            1,
            'ellipsis',
            page - 1,
            page,
            page + 1,
            'ellipsis',
            totalPages
        ]
    }

    return (
        <Pagination>
            <PaginationContent>

                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(event) => {
                            event.preventDefault()
                            if (loading) return

                            if (page > 1) {
                                setPage(page - 1)
                            }
                        }}
                    />
                </PaginationItem>

                {getPages().map((page, index) => {

                    if (page === 'ellipsis') {
                        return (
                            <PaginationItem key={`ellipsis-${index}`}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )
                    }

                    return (
                        <PaginationItem key={index}>
                            <PaginationLink
                                href="#"
                                isActive={page === currentPage}
                                onClick={(event) => {
                                    event.preventDefault()
                                    if (loading) return
                                    setPage(Number(page))
                                    setCurrentPage(Number(page))
                                }}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(event) => {
                            event.preventDefault()
                            if (loading) return
                            if (page < totalPages) {
                                setPage(page + 1)
                            }
                        }}
                    />
                </PaginationItem>

            </PaginationContent>
        </Pagination>
    )
}