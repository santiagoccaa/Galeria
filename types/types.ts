export interface PartialArticleInformation {
    imageUrl: string;
    name: string;
    description: string;
    price: string;
    stock: string;
    categoryId: string;
    id: string
}
export interface PartialArticles {
    name: string
    id: string
    price: number
    stock: number
    userId: string
    description: string
    imageUrl: string
    category: {
        name: string
    }
    normalizedName: string
}

export interface PurchaseProduct {
    name: string;
    id: string;
    description: string;
    price: number;
    stock: number;
    imageUrl: string;
}


// Metadaba de la compra

export interface MetadataPurchase {
    name: string,
    price: number,
    id: string,
    user_purchase_id: string,
    quantity: number
}