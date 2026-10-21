import { PartialArticles } from '@/types'
import { create } from 'zustand'

interface ArticlesProvider {
    articles: PartialArticles[]

    search: string

    page: number

    categoryId: string

    totalPages: number

    setArticles: (articles: PartialArticles[]) => void

    setSearch: (search: string) => void

    setPage: (page: number) => void

    setCategoryId: (categoryId: string) => void

    setTotalPages: (totalPages: number) => void

    loading: boolean

    setLoading: (loading: boolean) => void
}

export const useArticles = create<ArticlesProvider>((set) => ({
    articles: [],

    search: "",

    page: 1,

    categoryId: "",

    totalPages: 1,

    loading: false,

    setLoading: (loading) => set({ loading }),

    setArticles: (articles) => set({ articles }),

    setSearch: (search) => set({ search }),

    setPage: (page) => set({ page }),

    setCategoryId: (categoryId) => set({ categoryId }),

    setTotalPages: (totalPages) => set({ totalPages })

}))