import { categories } from "@/data"
import prisma from "@/lib/prisma"
import { normalizeText, preGenerateObjectId } from "@/utils/common"

const productNames = [
    "Sofá",
    "Sillón",
    "Mesa de centro",
    "Mesa auxiliar",
    "Mesa de comedor",
    "Silla",
    "Silla de comedor",
    "Mueble para TV",
    "Estantería",
    "Biblioteca",
    "Armario",
    "Lámpara",
    "Lámpara de mesa",
    "Lámpara de pie",
    "Espejo",
    "Cuadro decorativo",
    "Cojín",
    "Cortina",
    "Alfombra",
    "Jarrón decorativo",
]

const colors = [
    "Beige",
    "Negro",
    "Blanco",
    "Gris",
    "Marrón",
    "Azul",
    "Verde",
    "Natural",
]

const materials = [
    "Madera",
    "Metal",
    "Tela",
    "Cuero",
    "Vidrio",
    "Madera y metal",
]

const randomItem = <T,>(items: T[]): T => {
    return items[Math.floor(Math.random() * items.length)]
}

const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

async function main() {
    // Crear categorías
    const createdCategories = await Promise.all(
        categories.map((categorie) =>
            prisma.category.create({
                data: {
                    id: categorie.id,
                    name: categorie.name,
                },
            })
        )
    )

    console.log(`${createdCategories.length} categorías creadas correctamente.`)

    // Crear 100 artículos
    const articles = Array.from({ length: 100 }, (_, index) => {

        const category = randomItem(createdCategories)
        const productName = randomItem(productNames)
        const color = randomItem(colors)
        const material = randomItem(materials)

        return {
            id: preGenerateObjectId(),

            name: `${productName} ${color} ${index + 1}`,

            description: `${productName} fabricado en ${material.toLowerCase()}, color ${color.toLowerCase()}, ideal para complementar cualquier espacio. Este artículo es perfecto para aquellos que buscan calidad y estilo en su hogar.`,

            price: randomNumber(50000, 2500000),

            stock: randomNumber(1, 25),

            imageUrl: '/default_image.jpg',

            categoryId: category.id,

            userId: "seed-user",

            normalizedName: normalizeText(`${productName} ${color} ${index + 1}`)
        }
    })

    await prisma.articles.createMany({
        data: articles,
    })

    console.log("100 artículos creados correctamente.")
}

main()
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })