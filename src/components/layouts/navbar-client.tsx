// components/layouts/navbar-client.tsx
"use client";
import Link from "next/link";
import { CircleUser, Package2 } from "lucide-react";
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
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSetCookie } from "cookies-next";

export default function NavbarClient({
  userInfo
}: {
  userInfo: UserVm;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const setCookie = useSetCookie();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background bg-white px-4 md:px-6 z-40">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
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
