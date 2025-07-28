"use client";
import Link from "next/link";
import {CircleUser, Menu, Package2} from "lucide-react";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {LogoutButton} from "@/components/components/logout-button";
import {UserVm} from "@/lib/api/models/user/user-vm";
import {usePathname} from "next/navigation";

export default function AdminNavbarClient({
                                              userInfo,
                                          }: {
    userInfo: UserVm,
}) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/admin" && pathname === "/admin") {
            return true;
        }

        return path !== "/admin" && pathname.startsWith(path);
    };
    
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background bg-white px-4 md:px-6 z-40">
            <nav
                className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="/admin"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <Package2 className="h-6 w-6"/>
                    <span className="sr-only">Obelix</span>
                </Link>
                <Link
                    href="/admin"
                    className={`transition-colors hover:text-foreground ${isActive("/admin") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                >
                    Statistics
                </Link>
                <Link
                    href="/admin/users"
                    className={`transition-colors hover:text-foreground ${isActive("/admin/users") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                >
                    Users
                </Link>
                <Link
                    href="/admin/items"
                    className={`transition-colors hover:text-foreground ${isActive("/admin/items") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                >
                    Items
                </Link>
                <Link
                    href="/admin/requests"
                    className={`transition-colors hover:text-foreground ${isActive("/admin/requests") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                >
                    Requests
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5"/>
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <SheetTitle/>
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <Package2 className="h-6 w-6"/>
                            <span className="sr-only">Obelix</span>
                        </Link>
                        <Link
                            href="/admin"
                            className={`hover:text-foreground ${isActive("/admin") ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                            Statistics
                        </Link>
                        <Link
                            href="/admin/users"
                            className={`hover:text-foreground ${isActive("/admin/users") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                        >
                            Users
                        </Link>
                        <Link
                            href="/admin/items"
                            className={`hover:text-foreground ${isActive("/admin/items") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                        >
                            Items
                        </Link>
                        <Link
                            href="/admin/requests"
                            className={`hover:text-foreground ${isActive("/admin/requests") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                        >
                            Requests
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <CircleUser className="h-5 w-5"/>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{userInfo.userName}</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <LogoutButton/>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
