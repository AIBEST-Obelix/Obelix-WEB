"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RequestIm } from "@/lib/api/models/request/request-im";
import requestService from "@/lib/services/request-service";
import userService from "@/lib/services/user-service";
import itemService from "@/lib/services/item-service";
import { UserVm } from "@/lib/api/models/user/user-vm";
import { ItemVm } from "@/lib/api/models/item/item-vm";
import { toast } from "sonner";

interface CreateRequestFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CreateRequestForm({ onSuccess, onCancel }: CreateRequestFormProps) {
    const [formData, setFormData] = useState<RequestIm>({
        userId: "",
        itemId: "",
        description: "",
        status: "Pending"
    });
    const [users, setUsers] = useState<UserVm[]>([]);
    const [items, setItems] = useState<ItemVm[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersData, itemsData] = await Promise.all([
                    userService.GetAllUsersAsync(),
                    itemService.GetAllItemsAsync()
                ]);
                setUsers(usersData);
                setItems(itemsData);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Failed to load users and items");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await requestService.CreateRequestAsync(formData);
            toast.success("Request created successfully");
            onSuccess();
        } catch (error) {
            console.error("Error creating request:", error);
            toast.error("Failed to create request");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="userId">User</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, userId: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                    </SelectTrigger>
                    <SelectContent>
                        {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.firstName} {user.lastName} ({user.email})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="itemId">Item</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, itemId: value })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select an item" />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                                {item.name} - {item.type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter request description"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                        <SelectItem value="Returned">Returned</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Request"}
                </Button>
            </div>
        </form>
    );
}
