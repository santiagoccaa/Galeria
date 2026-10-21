import Link from "next/link"

import { Home, LucideIcon, ChartBarStacked } from "lucide-react";
import { UserButtonProfile } from "./UserButtonProfile";

type NavRoute = {
    id: number,
    href: string,
    name: string,
    icon: LucideIcon
}

const navRoutes: NavRoute[] = [
    {
        id: 1,
        href: "/inventario",
        name: "Articulos",
        icon: ChartBarStacked
    },
]

export const Navbar = () => {

    return (
        <div className="border-b">
            <nav className="w-full container mx-auto px-2 md:px-4 lg:px-12 flex justify-between items-center py-4 ">
                <Link href={"/"} aria-label="logo site web">
                    <img src="/general/salvia.png" className="w-50" alt="logo salvia" />
                </Link>
                <ul className="flex gap-12 items-center">

                    {navRoutes.map(({ id, href, name, icon: Icon }) =>
                        <li key={id}>
                            <Link href={href} className="flex gap-1 items-center font-semibold">
                                <Icon className="size-5" strokeWidth={2} />
                                {name}
                            </Link>
                        </li>
                    )}

                   <UserButtonProfile />
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
