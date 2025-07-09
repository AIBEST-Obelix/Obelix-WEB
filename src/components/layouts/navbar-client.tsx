// components/layouts/navbar-client.tsx
"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2 } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { LogoutButton } from "@/components/components/logout-button";
import { UserVm } from "@/lib/api/models/user/user-vm";
import { CompanyVM } from "@/lib/api/models/company/company-vm";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSetCookie } from "cookies-next";
import { PENDING_INVOICE_TABLE_REFRESH_EVENT, SELECTED_COMPANY_ID_KEY } from "@/lib/shared/constants";
import { SearchCompanies } from "@/components/components/search-companies";

export default function NavbarClient({
  userInfo,
  companies,
  currentCompanyId
}: {
  userInfo: UserVm;
  companies: CompanyVM[];
  currentCompanyId: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const setCookie = useSetCookie();

  // initialize state to either the cookie or (if none) the very first company
  const [currentCompany, setCurrentCompany] = useState<string>(
    currentCompanyId || companies[0]?.uic || ""
  );

  // as soon as we mount, if there was no cookie but we do have companies,
  // persist that first‐company choice back into the cookie and refresh so
  // your server components pick it up too
  useEffect(() => {
    if (!currentCompanyId && companies.length > 0) {
      const uic = companies[0].uic;
      setCurrentCompany(uic);
      setCookie(SELECTED_COMPANY_ID_KEY, uic, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax"
      });
      // this will re‐run your server components (e.g. the AccountantLayout → Dashboard)
      router.refresh();
      window.dispatchEvent(new CustomEvent(PENDING_INVOICE_TABLE_REFRESH_EVENT));
    }
  }, [currentCompanyId, companies, setCookie, router]);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background bg-white px-4 md:px-6 z-40">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          onClick={() => {
            setCurrentCompany("");
            setCookie(SELECTED_COMPANY_ID_KEY, "", { path: "/" });
          }}
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Obelix</span>
        </Link>
        <Link
          href="/"
          className={`transition-colors hover:text-foreground ${
            isActive("/") ? "text-foreground font-semibold" : "text-muted-foreground"
          }`}
        >
          Табло
        </Link>
      </nav>

      {/* mobile sheet omitted for brevity */}

      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <SearchCompanies
              currentCompany={currentCompany}
              setCurrentCompany={setCurrentCompany}
              companies={companies}
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{userInfo.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
