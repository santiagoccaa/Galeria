import { PartialArticles } from "@/types";
import { create } from "zustand";

interface ArticlesUserProvider {
    articlesUser: PartialArticles[]
    currentPage: number

    // criterios de filtro
    searchTerm: string
    categoryName: string // '' = todas

    setSearchTerm: (searchTerm: string) => void
    setCategoryName: (categoryName: string) => void

    setCurrentPage: (currentPage: number) => void
    setArticlesUser: (articlesUser: PartialArticles[]) => void
    addArticle: (article: PartialArticles) => void
    updateArticle: (id: string, data: Partial<PartialArticles>) => void
    removeArticleById: (id: string) => void
}

export const useArticlesUser = create<ArticlesUserProvider>((set) => ({
    articlesUser: [],
    currentPage: 1,
    searchTerm: '',
    categoryName: '',

    setSearchTerm: (searchTerm) => set({ searchTerm, currentPage: 1 }),
    setCategoryName: (categoryName) => set({ categoryName, currentPage: 1 }),

    setArticlesUser: (articlesUser) => set({ articlesUser }),
    setCurrentPage: (currentPage) => set({ currentPage }),

    addArticle: (article) =>
        set((state) => ({ articlesUser: [...state.articlesUser, article] })),

    updateArticle: (id, data) =>
        set((state) => ({
            articlesUser: state.articlesUser.map((a) =>
                a.id === id ? { ...a, ...data } : a
            ),
        })),

    removeArticleById: (id) =>
        set((state) => ({
            articlesUser: state.articlesUser.filter((a) => a.id !== id),
        })),
}))