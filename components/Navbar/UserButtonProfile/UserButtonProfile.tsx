import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { currentUser } from "@clerk/nextjs/server";
import { Show, SignInButton, SignOutButton } from "@clerk/nextjs";
import { ChartLine, LogIn, PlusIcon, Receipt, User } from "lucide-react";
import Link from "next/link";

export const UserButtonProfile = async () => {

    const user = await currentUser()

    return (
        <div>
            <Show when="signed-out">
                <SignInButton>
                    <button className="font-semibold py-2 px-4 rounded-sm flex items-center gap-2 bg-accent-foreground cursor-pointer">
                        <LogIn /> Ingresar
                    </button>
                </SignInButton>
            </Show>
            <Show when="signed-in">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        nativeButton={false}
                        render={
                            <Avatar className={"cursor-pointer"}>
                                <AvatarImage src={user?.imageUrl} />
                                <AvatarFallback className={"animate-pulse"}>
                                    <User />
                                </AvatarFallback>
                                <AvatarBadge>
                                    <PlusIcon />
                                </AvatarBadge>
                            </Avatar>
                        } />
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className={"capitalize"}>{user?.firstName}</DropdownMenuLabel>
                            <DropdownMenuItem
                                render={
                                    <Link
                                        href={`/compras/${user?.id}`}
                                    />
                                }
                            ><Receipt /> Compras</DropdownMenuItem>
                            <DropdownMenuItem
                                render={
                                    <Link
                                        href={`/metricas`}
                                    />
                                }
                            ><ChartLine /> Metricas</DropdownMenuItem>

                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup className={"px-2"}>
                            <SignOutButton />
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </Show>
        </div>
    )
}

