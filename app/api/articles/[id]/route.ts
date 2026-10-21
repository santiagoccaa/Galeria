import prisma from "@/lib/prisma"
import { PartialArticleInformation } from "@/types"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

interface Params {
    params: Promise<{ id: string }>
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json("UNAUTHORIZED", { status: 401 })
        }

        const { id } = await params

        const deletedArticle = await prisma.articles.delete({
            where: {
                id
            }
        })

        return NextResponse.json(deletedArticle, { status: 200 })
    } catch (error) {
        return NextResponse.json("INTERNAL SERVER ERROR", { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const data:PartialArticleInformation = await request.json()

        const article = await prisma.articles.findUnique({
            where: {
                id,
            },
        })

        if (!article) {
            return NextResponse.json(
                { message: "Articulo no encontrado." },
                { status: 404 }
            )
        }

        const updatedArticle = await prisma.articles.update({
            where: {
                id,
            },
            data: {
                name: data.name,
                description: data.description,
                price: Number(data.price),
                stock: Number(data.stock),
                categoryId: data.categoryId,
                ...(data.imageUrl && {
                    imageUrl: data.imageUrl,
                }),
            },
        })

        return NextResponse.json(updatedArticle)
    } catch (error) {
        console.error("Error actualizando articulo:", error)

        return NextResponse.json(
            { message: "No fue posible actualizar el articulo." },
            { status: 500 }
        )
    }
}