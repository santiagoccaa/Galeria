import {
    FaCouch,
    FaTable,
    FaChair,
    FaTv,
    FaBoxOpen,
    FaLightbulb,
    FaPalette,
    FaLayerGroup,
    FaGem,
} from "react-icons/fa6"

type CategoryVariant =
    | "sofas"
    | "mesas"
    | "sillas"
    | "tv"
    | "almacenamiento"
    | "iluminacion"
    | "decoracion"
    | "textiles"
    | "accesorios"
    | "default"

export const getCategoryVariant = (name: string): CategoryVariant => {
    const variantMap: Record<string, CategoryVariant> = {
        "Sofas y Sillones": "sofas",
        "Mesas": "mesas",
        "Sillas": "sillas",
        "Muebles para TV": "tv",
        "Almacenamiento": "almacenamiento",
        "Iluminación": "iluminacion",
        "Decoración": "decoracion",
        "Textiles": "textiles",
        "Accesorios": "accesorios",
    }

    return variantMap[name] || "default"
}

export const getCategoryIcon = (name: string) => {
    const iconMap = {
        "Sofas y Sillones": FaCouch,
        "Mesas": FaTable,
        "Sillas": FaChair,
        "Muebles para TV": FaTv,
        "Almacenamiento": FaBoxOpen,
        "Iluminación": FaLightbulb,
        "Decoración": FaPalette,
        "Textiles": FaLayerGroup,
        "Accesorios": FaGem,
    }

    return iconMap[name as keyof typeof iconMap] ?? FaBoxOpen
}