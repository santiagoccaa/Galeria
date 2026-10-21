"use client"

import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Controller, useForm } from "react-hook-form"
import { formSchema } from "./artitle.form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { useUploadThing } from "@/utils/uploadthing"
import { ImagePlus, LoaderIcon } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { categories } from "@/data"
import axios from "axios"
import { useArticlesUser } from "@/store/useArticlesUser"
import { PartialArticleInformation, PartialArticles } from "@/types"
import { normalizeText, preGenerateObjectId } from "@/utils/common"
import { useAuth, useUser } from "@clerk/nextjs"

interface AddArticleFormProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddArticleForm = ({ setOpen }: AddArticleFormProps) => {

    const { userId } = useAuth()

    const { addArticle, articlesUser } = useArticlesUser()

    const [image, setImage] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stock: "",
            categoryId: ""
        },
    })

    const { startUpload } = useUploadThing("imageUploader")

    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file = event.target.files?.[0]

        if (!file) return

        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const onSubmit2 = async (data: z.infer<typeof formSchema>) => {

        const categoryName = categories.find((category) => category.id === data.categoryId)!!

        if (articlesUser.length > 9) {
            toast.add({ title: "Limite alcanzado", description: "Un usuario solo puede tener 10 articulos" })
            return
        }

        const { description, name, price, stock } = data

        const newArticle: PartialArticles = {
            category: { name: categoryName.name },
            description,
            id: preGenerateObjectId(),
            imageUrl: preview ?? '',
            name,
            price: Number(price),
            stock: Number(stock),
            userId: userId ?? '',
            normalizedName: normalizeText(name)
        }
        addArticle(newArticle)

        setOpen(false)

        toast.add({ title: `Producto ${name} añadido`, description: "Fue añadido al store, no a la BD para ahorrar recursos ;)" })

    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {

        const { categoryId, description, name, price, stock } = data

        const categoryName = categories.find((category) => category.id === categoryId)!!

        if (articlesUser.length > 9) {
            toast.add({ title: "Limite alcanzado", description: "Un usuario solo puede tener 10 articulos" })
            return
        }

        const newArticle: PartialArticles = {
            category: { name: categoryName.name },
            description,
            id: preGenerateObjectId(),
            imageUrl: preview ?? '',
            name,
            price: Number(price),
            stock: Number(stock),
            userId: userId ?? '',
            normalizedName: normalizeText(name)
        }
        addArticle(newArticle)

        setOpen(false)

        toast.add({ title: `Producto ${name} añadido`, description: "Fue añadido al store, no a la BD para ahorrar recursos ;)" })

        try {
            setLoading(true)

            let imageUrl = ""

            if (image) {

                const uploadedFiles = await startUpload([image])

                if (!uploadedFiles?.[0]) {
                    throw new Error("No se pudo subir la imagen.")
                }

                imageUrl = uploadedFiles[0].ufsUrl
            }

            const product: PartialArticleInformation = {
                ...data,
                imageUrl: imageUrl,
                id: preGenerateObjectId()
            }

            await axios.post("/api/articles", product)

        } catch (error) {

            toast.add({
                type: "error",
                description: "No fue posible añadir el articulo.",
            })

        } finally {
            setLoading(false)
        }
    }

    return (
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
                <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Nombre</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Silla de cuero"
                                autoComplete="off"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="categoryId"
                    control={form.control}
                    render={({ field, fieldState }) => {
                        const selectedCategory = categories.find(
                            (item) => item.id === field.value
                        )

                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Categoría
                                </FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger className="w-45">
                                        <SelectValue placeholder="Categoría">
                                            {selectedCategory?.name}
                                        </SelectValue>
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectGroup>
                                            {categories.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )
                    }}
                />
            </div>

            <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Descripcion</FieldLabel>
                        <Textarea
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="Este producto esta sirve para..."
                            autoComplete="off"
                        />

                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <div className="flex gap-4">
                <Controller
                    name="stock"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                autoComplete="off"
                                type="number"
                            />

                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="price"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Precio</FieldLabel>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                autoComplete="off"
                                type="number"
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>

            <div className="w-40 aspect-square">
                <label
                    htmlFor="product-image"
                    className="group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#68735A]/40 bg-[#F5F1E8] transition hover:border-[#68735A]"
                >
                    {preview ? (
                        <>
                            <img
                                src={preview}
                                alt="Vista previa"
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                                <span className="rounded-md bg-white px-3 py-2 text-sm font-medium">
                                    Cambiar imagen
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-[#68735A]">
                            <ImagePlus className="size-8" />

                            <span className="text-center text-sm font-medium">
                                Añadir imagen
                            </span>

                            <span className="text-xs text-muted-foreground">
                                PNG, JPG o WEBP
                            </span>
                        </div>
                    )}

                    <input
                        id="product-image"
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        onChange={handleImageChange}
                    />
                </label>
            </div>

            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                    type="submit"
                    disabled={loading}
                >
                    {loading ?
                        <LoaderIcon className="animate-spin" />
                        :
                        'Añadir'
                    }
                </AlertDialogAction>
            </AlertDialogFooter>
        </form>
    )
}

