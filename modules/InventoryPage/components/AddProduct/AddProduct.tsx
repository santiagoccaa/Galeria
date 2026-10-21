"use client"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus } from "lucide-react"
import { AddArticleForm } from "./AddArticleForm"
import { useState } from "react"

export const AddProduct = () => {

    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger render={<Button className={"text-black bg-white"} />}>
                <Plus /> Añadir articulo
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Añade un Articulo</AlertDialogTitle>
                </AlertDialogHeader>

                {/* FORMULARIO PARA AÑADIR ARTICULO */}
                <AddArticleForm setOpen={setOpen} />
            </AlertDialogContent>
        </AlertDialog>
    )
}

