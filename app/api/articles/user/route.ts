import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: Request) {

    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json('NO ESTAS AUTORIZADO', { status: 401 })
        }

        const articles = await prisma.articles.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            },
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
                },
                normalizedName: true
            }
        })

        return NextResponse.json(articles, { status: 200 })
    } catch (error) {
        console.log("GET-ARTICLES-USER:", error)
        return NextResponse.json([], { status: 500 })
    }
}