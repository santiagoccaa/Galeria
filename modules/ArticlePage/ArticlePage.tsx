import { PurchaseProduct } from "@/types";
import { ArticleData } from "./components";

export const ArticlePage = (article: PurchaseProduct) => {

    const { description, imageUrl, name, price, stock, id } = article

    return <ArticleData
        description={description}
        imageUrl={imageUrl}
        name={name}
        price={price}
        stock={stock}
        id={id}
    />
}

