"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { ITEM_TABLE_REFRESH_EVENT } from "@/lib/shared/constants";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import itemService from "@/lib/services/item-service";

export function DeleteItemForm(
    {
        setOpen,
        className,
        itemName,
        itemId
    } : React.ComponentProps<"form"> & {
        setOpen?: Dispatch<SetStateAction<boolean>>,
        itemName: string,
        itemId: string
    })
{
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            await itemService.DeleteItemAsync(itemId);

            toast.success(`Successfully deleted item ${itemName}.`);

            const refreshEvent = new CustomEvent(ITEM_TABLE_REFRESH_EVENT);
            window.dispatchEvent(refreshEvent);

            if (setOpen) {
                setOpen(false);
            }
        } catch (error) {
            const msg = ErrorHandler.HandleUserError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4 pr-4 pl-4 md:pr-0 md:pl-0", className)}>
            <p className="text-sm text-gray-600">
                This action cannot be undone. The item "{itemName}" will be permanently deleted.
            </p>

            <Button type="submit" variant="destructive" className="w-full" disabled={isLoading}>
                {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Please wait" : "Delete Item"}
            </Button>
        </form>
    );
}
