import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const HomePage = () => {
    return (
        <div className="h-full flex w-full container mx-auto px-2 md:px:4 lg:px-12">
            <div className="flex w-1/2 justify-center items-center">
                <div className="space-y-4">
                    <h1 className="text-6xl font-extrabold">
                        Haz de tu sala, tu lugar favorito.
                    </h1>

                    <p className="text-base font-light w-5/6">
                        Diseñamos espacios que combinan comodidad, elegancia y personalidad. Encuentra mesas, sillas, sofás y detalles que transforman tu sala en un lugar para disfrutar.
                    </p>

                    <Button
                        render={<Link href={"/inventario"} />}
                        nativeButton={false}
                        className={"rounded-full bg-white text-black font-bold text-base mt-12 py-6 px-8"}>
                        Explorar productos <ArrowUpRight className="size-5" />
                    </Button>
                </div>
            </div>

            <div className="w-1/2 flex-1 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <Image src={"/salas/home.jpg"} width={800} height={800} alt="image home" className="absolute top-0" />
                    <div className="absolute inset-0 bg-black opacity-20" />
                </div>
            </div>
        </div>
    )
}

