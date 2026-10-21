import { useArticlesUser } from "@/store/useArticlesUser"
import { normalizeText } from "@/utils/common"
import { useMemo } from "react"

export const useFilteredArticles = () => {

    const { articlesUser, searchTerm, categoryName } = useArticlesUser()

    return useMemo(() => {
        const term = normalizeText(searchTerm)

        return articlesUser.filter((article) => {
            const matchesSearch = !term || article.normalizedName.includes(term)
            const matchesCategory = !categoryName || article.category.name === categoryName
            return matchesSearch && matchesCategory
        })


    }, [articlesUser, searchTerm, categoryName])
}