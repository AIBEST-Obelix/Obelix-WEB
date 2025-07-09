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
import {CompanyVM} from "@/lib/api/models/company/company-vm";
import {useState} from "react";
import {usePathname} from "next/navigation";
import {SearchCompanies} from "@/components/components/search-companies";

export default function AdminNavbarClient({
                                              userInfo,
                                              companies,
                                              currentCompanyId
                                          }: {
    userInfo: UserVm,
    companies: CompanyVM[],
    currentCompanyId: string
}) {
    const [currentCompany, setCurrentCompany] = useState<string>(currentCompanyId);
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === "/admin" && pathname === "/admin") {
            return true;
        }

        if (path === "/admin/company") {
            return pathname === "/admin/company";
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
                    onClick={() => setCurrentCompany("")}
                >
                    <Package2 className="h-6 w-6"/>
                    <span className="sr-only">Obelix</span>
                </Link>
                <Link
                    href="/admin"
                    className={`transition-colors hover:text-foreground ${isActive("/admin") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                    onClick={() => setCurrentCompany("")}
                >
                    Статистика
                </Link>
                <Link
                    href="/admin/user"
                    className={`transition-colors hover:text-foreground ${isActive("/admin/user") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                    onClick={() => setCurrentCompany("")}
                >
                    Потребители
                </Link>
                <Link
                    href="/admin/company"
                    className={`transition-colors hover:text-foreground ${isActive("/admin/company") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                    onClick={() => setCurrentCompany("")}
                >
                    Компании
                </Link>
                {
                    currentCompany && (
                        <>
                            <hr />
                            <Link href={"/admin/provider/" + currentCompany}
                                  className={`transition-colors hover:text-foreground text-nowrap ${pathname === "/admin/company/" + currentCompany ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                            >
                                Табло - {companies.find((company) => company.uic === currentCompany)?.name}
                            </Link>
                            <Link href={"/admin/provider/" + currentCompany + "/document"}
                                  className={`transition-colors hover:text-foreground ${pathname.includes("/admin/company/" + currentCompany + "/document") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                            >
                                Документи
                            </Link>
                        </>
                    )
                }
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
                            onClick={() => setCurrentCompany("")}
                        >
                            <Package2 className="h-6 w-6"/>
                            <span className="sr-only">Obelix</span>
                        </Link>
                        <Link
                            href="/admin"
                            className={`hover:text-foreground ${isActive("/admin") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                            onClick={() => setCurrentCompany("")}>
                            Статистика
                        </Link>
                        <Link
                            href="/admin/user"
                            className={`hover:text-foreground ${isActive("/admin/user") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                            onClick={() => setCurrentCompany("")}
                        >
                            Потребители
                        </Link>
                        <Link
                            href="/admin/company"
                            className={`hover:text-foreground ${isActive("/admin/company") ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                            onClick={() => setCurrentCompany("")}
                        >
                            Компании
                        </Link>
                        {
                            currentCompany && (
                                <>
                                    <hr />
                                    <Link href={"/admin/company/" + currentCompanyId}
                                          className={`hover:text-foreground text-nowrap ${pathname === "/admin/company/" + currentCompany ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                                    >
                                        Табло - {companies.find((company) => company.uic == currentCompanyId)?.name}
                                    </Link>

                                    <Link href={"/admin/company/" + currentCompanyId + "/document"}
                                          className={`hover:text-foreground text-nowrap ${pathname === "/admin/company/" + currentCompany + "/document" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                                    >
                                        Документи
                                    </Link>
                                </>
                            )
                        }
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative">
                        <SearchCompanies
                            currentCompany={currentCompany}
                            setCurrentCompany={setCurrentCompany}
                            companies={companies}/>
                    </div>
                </form>
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