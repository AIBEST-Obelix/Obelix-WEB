"use client"

import {DropdownMenuItem} from "@/components/ui/dropdown-menu";
import authService from "@/lib/services/auth-service";
import {useRouter} from "next/navigation";

export function LogoutButton() {
    const router = useRouter();
    
    return (
        <DropdownMenuItem onClick={
            async () => {
                await authService.LogoutAsync();
                router.push("/");
                router.refresh();
            }
        }>Излизане</DropdownMenuItem>
    )
}