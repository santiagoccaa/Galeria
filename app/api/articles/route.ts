import prisma from "@/lib/prisma"
import { PartialArticleInformation } from "@/types"
import { normalizeText, preGenerateObjectId } from "@/utils/common"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: Request) {

    try {

        const data: PartialArticleInformation = await req.json()

        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json("UNATHORIZED", { status: 500 })

        }

        const { categoryId, description, imageUrl, name, price, stock, id } = data

        const newArticle = await prisma.articles.create({
            data: {
                id,
                userId,
                categoryId,
                description,
                imageUrl,
                name,
                normalizedName: normalizeText(name),
                price: Number(price),
                stock: Number(stock),
            }
        })

        return NextResponse.json(newArticle, { status: 200 })

    } catch (error) {
        console.log("CREATE ARTICLE:", error)
        return NextResponse.json("[CREATE ARTICLE]", { status: 500 })

    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams

        const parsedPage = Number(searchParams.get('page'))
        const page = Number.isInteger(parsedPage) && parsedPage > 0
            ? parsedPage
            : 1

        const categoryId = searchParams.get('categoryId')
        const search = searchParams.get('search')?.trim() || ''

        const pageSize = 10
        const skip = (page - 1) * pageSize

        const where = {
            ...(categoryId && {
                categoryId
            }),

            ...(search.length >= 3 && {
                normalizedName: {
                    contains: normalizeText(search),
                    mode: 'insensitive' as const
                }
            })
        }

        const [articles, totalArticles] = await Promise.all([
            prisma.articles.findMany({
                where,
                skip,
                take: pageSize,
                select: {
                    name: true,
                    id: true,
                    price: true,
                    stock: true,
                    userId: true,
                    description: true,
                    imageUrl: true,
                    category: {
                        select: {
                            name: true
                        }
                    }
                }, orderBy: {
                    createdAt: 'desc'
                },
            }),

            prisma.articles.count({
                where
            })
        ])

        const totalPages = Math.ceil(totalArticles / pageSize)

        return NextResponse.json({
            articles,
            totalArticles,
            totalPages,
            currentPage: page
        })

    } catch (error) {
        console.error(error)

        return NextResponse.json(
            { message: 'Error al obtener los artículos' },
            { status: 500 }
        )
    }
}