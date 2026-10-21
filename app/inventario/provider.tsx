'use client'

import { useArticles } from "@/store/useArticles";
import { useArticlesUser } from "@/store/useArticlesUser";
import { PartialArticles } from "@/types";
import axios from "axios";
import { useEffect } from "react";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {

    const { search, categoryId, page, setArticles, setTotalPages, setLoading } = useArticles()
    const { setArticlesUser, setCurrentPage } = useArticlesUser()

    useEffect(() => {
        const getUserArticles = async () => {
            try {
                const { data } = await axios.get('/api/articles/user')
                
                setArticlesUser(data as PartialArticles[] )
            } catch (error) {
                console.error('No se pudieron obtener los artículos del usuario', error)
            }
        }

        getUserArticles()

    }, [])

    useEffect(() => {
        if (search.length > 0 && search.length < 3) return

        const controller = new AbortController()

        const timeout = setTimeout(async () => {
            setLoading(true)
            try {
                const { data } = await axios.get('/api/articles', {
                    params: {
                        page,
                        categoryId: categoryId || undefined,
                        search: search || undefined,
                    },
                    signal: controller.signal,
                })

                setArticles(data.articles)
                setTotalPages(data.totalPages)
                setCurrentPage(data.currentPage)
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error('No se pudieron obtener los artículos', error)
                }
            } finally {
                setLoading(false)
            }
        }, 800)

        return () => {
            clearTimeout(timeout)
            controller.abort()
        }
    }, [page, categoryId, search, setArticles, setTotalPages])

    return <>{children}</>;
}