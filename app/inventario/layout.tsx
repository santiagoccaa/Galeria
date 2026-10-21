import { FiltrosNav } from "@/modules/InventoryPage/components";
import Providers from "./provider";

export default function ArticlesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <Providers>
            <div className="container mx-auto px-2 md:px-4 lg:px-12 flex-1 h-full pt-8 space-y-4">
                <FiltrosNav />
                {children}
            </div>
        </Providers>
    );
}
