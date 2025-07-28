"use client";

import { useEffect, useState } from "react";
import itemService from "@/lib/services/item-service";
import { Skeleton } from "@/components/ui/skeleton";

interface ItemImageProps {
    itemId: string;
    className?: string;
    maxImages?: number;
}

export function ItemImage({ itemId, className = "", maxImages = 1 }: ItemImageProps) {
    const [imageIds, setImageIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchImageIds = async () => {
            try {
                setLoading(true);
                console.log("Fetching image IDs for item:", itemId);
                const ids = await itemService.GetItemImageIdsAsync(itemId);
                console.log("Received image IDs:", ids);
                setImageIds(ids.slice(0, maxImages)); // Limit number of images shown
            } catch (error) {
                console.error("Failed to fetch image IDs:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchImageIds();
    }, [itemId, maxImages]);

    if (loading) {
        return <Skeleton className={`w-16 h-16 rounded ${className}`} />;
    }

    if (error || imageIds.length === 0) {
        return (
            <div className={`w-16 h-16 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-xs ${className}`}>
                No Image
            </div>
        );
    }

    if (imageIds.length === 1) {
        const imageUrl = itemService.GetItemImageUrlAsync(imageIds[0]);
        console.log("Generated image URL:", imageUrl, "for image ID:", imageIds[0]);
        return (
            <img
                src={imageUrl}
                alt="Item image"
                className={`w-16 h-16 object-cover rounded border ${className}`}
                onError={(e) => {
                    console.error("Image failed to load:", imageUrl);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    setError(true);
                }}
                onLoad={() => {
                    console.log("Image loaded successfully:", imageUrl);
                }}
            />
        );
    }

    // Multiple images - show first image with count indicator
    const imageUrl = itemService.GetItemImageUrlAsync(imageIds[0]);
    console.log("Generated image URL for multiple images:", imageUrl, "for image ID:", imageIds[0]);
    return (
        <div className={`relative ${className}`}>
            <img
                src={imageUrl}
                alt="Item image"
                className="w-16 h-16 object-cover rounded border"
                onError={(e) => {
                    console.error("Image failed to load:", imageUrl);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    setError(true);
                }}
                onLoad={() => {
                    console.log("Image loaded successfully:", imageUrl);
                }}
            />
            {imageIds.length > 1 && (
                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    +{imageIds.length - 1}
                </div>
            )}
        </div>
    );
}
