"use client";

import { ComponentProps, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { ITEM_TABLE_REFRESH_EVENT } from "@/lib/shared/constants";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import itemService from "@/lib/services/item-service";
import { ItemUm } from "@/lib/api/models/item/item-um";

export function EditItemForm(
    {
        setOpen,
        className,
        item,
        itemId
    } : ComponentProps<"form"> & {
        setOpen?: Dispatch<SetStateAction<boolean>>,
        item: {name: string, type: string, serialNumber: string},
        itemId: string
    })
{
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const name = form['name'].value;
        const type = form['type'].value;
        const serialNumber = form['serialNumber'].value;

        try {
            const updateData = new ItemUm();
            updateData.name = name.trim();
            updateData.type = type.trim();
            updateData.serialNumber = serialNumber.trim();

            // Basic validation
            if (!updateData.name) {
                throw new Error("Name is required.");
            }
            if (!updateData.type) {
                throw new Error("Type is required.");
            }
            if (!updateData.serialNumber) {
                throw new Error("Serial number is required.");
            }

            await itemService.UpdateItemAsync(itemId, updateData);
            toast.success(`Successfully updated item ${name}.`);

            const event = new CustomEvent(ITEM_TABLE_REFRESH_EVENT);
            window.dispatchEvent(event);

            if (setOpen) {
                setOpen(false);
            }

        } catch (error) {
            const msg = ErrorHandler.HandleUserError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4 pr-4 pl-4 md:pr-0 md:pl-0", className)}>
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={item.name} required />

                <Label htmlFor="type">Type</Label>
                <Input id="type" defaultValue={item.type} required />

                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input id="serialNumber" defaultValue={item.serialNumber} required />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Please wait" : "Save"}
            </Button>
        </form>
    )
}
