"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import requestService from "@/lib/services/request-service";
import { RequestIm, RequestStatus } from "@/lib/api/models/request/request-im";
import itemService from "@/lib/services/item-service";
import { ItemVm } from "@/lib/api/models/item/item-vm";

export function CreateRequestForm({
    setOpen,
    className
}: React.ComponentProps<"form"> & {
    setOpen?: Dispatch<SetStateAction<boolean>>
}) {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<ItemVm[]>([]);

    React.useEffect(() => {
        const fetchItems = async () => {
            try {
                const itemsData = await itemService.GetAllItemsAsync();
                setItems(itemsData);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };
        fetchItems();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const form = event.currentTarget;
        const itemId = form['itemId'].value;
        const description = form['description'].value;

        try {
            const requestIm: RequestIm = {
                userId: '', // Will be set by backend based on current user
                itemId: itemId,
                description: description,
                status: RequestStatus.Pending
            };

            await requestService.CreateRequestAsync(requestIm);

            toast.success("Request created successfully");

            // Refresh the requests table
            const event = new CustomEvent("request-table-refresh");
            window.dispatchEvent(event);

            setOpen && setOpen(false);
        } catch (error) {
            const msg = ErrorHandler.HandleUserError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="itemId">Item</Label>
                <Select name="itemId" required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Label htmlFor="description">Description</Label>
                <textarea 
                    id="description" 
                    name="description"
                    placeholder="Enter request description..."
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isLoading ? "Creating..." : "Create Request"}
            </Button>
        </form>
    );
} 