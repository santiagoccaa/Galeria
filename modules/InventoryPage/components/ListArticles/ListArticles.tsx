"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/toast"
import prisma from "@/lib/prisma"
import { Articles } from "@prisma/client"
import axios from "axios"
import { Edit, Eye, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { EditArticle } from "./EditArticle"
import { Skeleton } from "@/components/ui/skeleton"
import { PartialArticles } from "@/types"
import { Badge } from "@/components/ui/badge"
import { useArticlesUser } from "@/store/useArticlesUser"
import { useArticles } from "@/store/useArticles"
import { getCategoryIcon, getCategoryVariant } from "@/components/ui"

interface ListArticlesProps {
    articles: PartialArticles[]
    actions?: boolean
}

export const ListArticles = ({ articles, actions = false }: ListArticlesProps) => {

    const { removeArticleById } = useArticlesUser()
    const { loading } = useArticles()

    const router = useRouter()
    const [openEdit, setOpenEdit] = useState(false)
    const [openDeleted, setOpenDeleted] = useState(false)

    const [selectedArticle, setSelectedArticle] = useState<PartialArticles | null>(null)
    const [idArticle, setIdArticle] = useState('')

    const onDeleted = async (id: string) => {
        removeArticleById(id)
        setOpenDeleted(false)
        toast.add({ description: "Articulo eliminado" })

        try {
            await axios.delete(`/api/articles/${id}`)
        } catch (error) {
            toast.add({ description: "No fue posible eliminar el articulo" })
        }
    }

    const onRedirect = (id: string) => router.push(`/inventario/${id}`)

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead className="text-right">Precio</TableHead>
                        <TableHead className="text-center">Stock</TableHead>
                        {actions &&
                            <TableHead className="text-right">Acciones</TableHead>
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* ARRAY PARA MOSTRAR SKELETON */}
                    {loading ? (
                        Array.from({ length: 2 }).map((_, index) => (
                            <TableRow key={index}>
                                {Array.from({ length: actions ? 5 : 4 }).map((_, index) => (
                                    <TableCell className="font-medium" key={index}>
                                        <Skeleton className="h-3 rounded-xs" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        articles.map((article) => {

                            const { id, name, stock, price, category } = article

                            return (
                                <TableRow key={id} onClick={() => onRedirect(id)} className="cursor-pointer">
                                    <TableCell className="font-medium">{name}</TableCell>
                                    <TableCell>
                                        <Badge variant={getCategoryVariant(category.name)}>
                                            {(() => {
                                                const Icon = getCategoryIcon(category.name)

                                                return <Icon className="size-4" data-icon="inline-end" />
                                            })()}
                                            {category.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        ${price.toLocaleString('es-CO')}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {stock}
                                    </TableCell>
                                    {actions &&
                                        <TableCell className={`text-right flex justify-end`}>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    onClick={(event) => {
                                                        event.stopPropagation()

                                                        setSelectedArticle(article)
                                                        setOpenEdit(true)
                                                    }}
                                                >
                                                    <Edit />
                                                    Editar
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    onClick={(event) => {
                                                        event.stopPropagation()

                                                        setIdArticle(id)
                                                        setOpenDeleted(true)
                                                    }}
                                                >
                                                    <Trash />
                                                </Button>

                                            </div>
                                        </TableCell>
                                    }
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>

            {/* EDIT PRODUCT */}
            <AlertDialog open={openEdit} onOpenChange={setOpenEdit}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Añade un Articulo</AlertDialogTitle>
                    </AlertDialogHeader>

                    {/* FORMULARIO PARA AÑADIR ARTICULO */}
                    {selectedArticle && (
                        <EditArticle
                            setOpen={setOpenEdit}
                            article={selectedArticle}
                        />
                    )}
                </AlertDialogContent>
            </AlertDialog>

            {/* DELETED PRODUCT */}
            <AlertDialog open={openDeleted} onOpenChange={setOpenDeleted}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Estas seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Esto eliminara el articulo por completo
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            variant={"destructive"}
                            onClick={() => onDeleted(idArticle)}
                        >
                            Eliminar
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

