import * as z from "zod"

export const formSchema = z.object({
    name: z
        .string()
        .min(2, "El nombre debe tener al menos 5 caracteres.")
        .max(32, "El nombre no puede superar los 32 caracteres."),

    description: z
        .string()
        .min(1, "La descripción es obligatoria.")
        .max(500, "La descripción no puede superar los 100 caracteres."),

    price: z
        .string()
        .min(1, "El precio es obligatorio.")
        .max(100, "El precio no puede superar los 100 caracteres."),

    stock: z
        .string()
        .min(1, "El stock es obligatorio.")
        .max(100, "El stock no puede superar los 100 caracteres."),

    categoryId: z
        .string()
        .min(1, "La categoría es obligatoria.")
        .max(100, "La categoría no puede superar los 100 caracteres."),
})
