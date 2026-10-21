"use client"

import { Button } from "@/components/ui/button";
import { ArticleData } from "./components";
import { useArticlesUser } from "@/store/useArticlesUser";
import { LuPackageX } from "react-icons/lu";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Props {
    id: string
}
export const ArticleUser = ({ id }: Props) => {

    const { articlesUser } = useArticlesUser()

    const article = articlesUser.find((article) => article.id === id)

    if (!article) {
        return (
            <div className="flex flex-col gap-4 text-center items-center">
                <LuPackageX className="size-10" />
                <h3 className="text-2xl font-bold">No hay informacion de este producto</h3>

                <Button
                    nativeButton={false}
                    className={"bg-green-500"}
                    render={
                        <Link href={"/inventario"} className="flex gap-2 items-center">
                            <ArrowLeft /> Ir al inventario
                        </Link>
                    }
                />
            </div>
        )
    }

    const { description, imageUrl, name, price, stock } = article

    return <ArticleData
        description={description}
        imageUrl={imageUrl}
        name={name}
        price={price}
        stock={stock}
        id={id}
    />
}

