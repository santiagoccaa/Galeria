"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { BookOpen, CodeXml, SquareTerminal } from "lucide-react"

export const routes = [
    {
        title: "articles",
        url: "/articles",
        icon: SquareTerminal
    },
    {
        title: "reader",
        url: "/readers",
        icon: BookOpen
    },

]

export function AppSidebar() {

    const { state } = useSidebar()

    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="bg-white">
                <SidebarHeader>
                    <Link href={"/"} className="flex flex-row items-center gap-2">
                        <div className="p-1 rounded-full text-white bg-primary">
                            <CodeXml className="w-6 h-6" />
                        </div>
                        {
                            state === 'expanded' && <span className="text-xl font-semibold text-gray-800 tracking-wide">Blog</span>
                        }
                    </Link>
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarMenu className="space-y-2">
                        {
                            routes.map((route) => (
                                <SidebarMenuItem key={route.title}>
                                    <SidebarMenuButton render={
                                        <Link href={route.url}>
                                            <div className="p-1 rounded-lg text-white bg-primary">
                                                <route.icon className="w-4 h-4" />
                                            </div>
                                            {state === "expanded" && <span>{route.title}</span>}
                                        </Link>

                                    } />
                                </SidebarMenuItem>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent >
        </Sidebar >
    )
}