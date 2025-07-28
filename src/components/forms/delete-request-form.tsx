"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RequestVm } from "@/lib/api/models/request/request-vm";
import requestService from "@/lib/services/request-service";
import { toast } from "sonner";

interface DeleteRequestFormProps {
    request: RequestVm;
    onSuccess: () => void;
    onCancel: () => void;
}

export function DeleteRequestForm({ request, onSuccess, onCancel }: DeleteRequestFormProps) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);

        try {
            await requestService.DeleteRequestAsync(request.id);
            toast.success("Request deleted successfully");
            onSuccess();
        } catch (error) {
            console.error("Error deleting request:", error);
            toast.error("Failed to delete request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <p>
                Are you sure you want to delete the request from <strong>{request.userName}</strong> for <strong>{request.itemName}</strong>?
            </p>
            <p className="text-sm text-muted-foreground">
                This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete Request"}
                </Button>
            </div>
        </div>
    );
}
