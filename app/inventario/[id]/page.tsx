import prisma from "@/lib/prisma"
import { ArticlePage, ArticleUser } from "@/modules";

interface ArticleProps {
    params: Promise<{ id: string }>
}

export default async function Article({ params }: ArticleProps) {

    const { id } = await params

    const product = await prisma.articles.findFirst({
        where: { id },
        select: {
            id: true,
            description: true,
            imageUrl: true,
            name: true,
            price: true,
            stock: true
        }

    })

    if (!product) {
        return <ArticleUser id={id} />
    }

    return <ArticlePage {...product} />
}
