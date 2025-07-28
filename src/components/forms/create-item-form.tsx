"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";
import { ITEM_TABLE_REFRESH_EVENT } from "@/lib/shared/constants";
import itemService from "@/lib/services/item-service";
import { Upload } from "lucide-react";

export function CreateItemForm(
    { 
        setOpen, 
        className 
    } : React.ComponentProps<"form"> & { 
        setOpen?: Dispatch<SetStateAction<boolean>>
    }) 
{
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error("Please select a valid image file");
                return;
            }

            // Validate file size (e.g., max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                toast.error("Image file size must be less than 10MB");
                return;
            }

            setSelectedFile(file);
            
            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!selectedFile) {
            toast.error("Please select an image file");
            return;
        }

        setIsLoading(true);

        try {
            await itemService.CreateItemAsync(selectedFile);
            
            toast.success("Image uploaded successfully! Item analysis in progress...");

            // Dispatch refresh event
            const refreshEvent = new CustomEvent(ITEM_TABLE_REFRESH_EVENT);
            window.dispatchEvent(refreshEvent);

            setOpen && setOpen(false);
        } catch (error) {
            const msg = ErrorHandler.HandleUserError(error as AxiosError);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    // Cleanup preview URL when component unmounts
    React.useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <form onSubmit={handleSubmit} className={cn("grid items-start gap-4 pr-4 pl-4 md:pr-0 md:pl-0", className)}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="image">Select Image</Label>
                    <div className="flex flex-col gap-2">
                        <Input
                            id="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            required
                        />
                        <p className="text-sm text-gray-500">
                            Supported formats: JPG, PNG, GIF, WebP (Max 10MB)
                        </p>
                    </div>
                </div>

                {previewUrl && (
                    <div className="grid gap-2">
                        <Label>Preview</Label>
                        <div className="border rounded-lg p-4 bg-gray-50">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-w-full max-h-64 mx-auto object-contain rounded"
                            />
                        </div>
                    </div>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading || !selectedFile}>
                {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                {!isLoading && (
                    <Upload className="mr-2 h-4 w-4" />
                )}
                {isLoading ? "Uploading..." : "Upload & Analyze"}
            </Button>
        </form>
    );
}
