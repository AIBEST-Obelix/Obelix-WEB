import { ItemVm } from "@/lib/api/models/item/item-vm";
import { ItemUm } from "@/lib/api/models/item/item-um";
import clientHttpClient from "@/lib/services/client-http";

export class ItemService {
    async GetAllItemsAsync(): Promise<Array<ItemVm>> {
        const res = await clientHttpClient.get<Array<ItemVm>>("/api/items");
        return res.data;
    }

    async GetItemByIdAsync(itemId: string): Promise<ItemVm> {
        const res = await clientHttpClient.get<ItemVm>(`/api/items/${itemId}`);
        return res.data;
    }

    async CreateItemAsync(imageFile: File): Promise<void> {
        const formData = new FormData();
        // Backend expects 'files' parameter as List<IFormFile>
        formData.append('files', imageFile);

        await clientHttpClient.post("/api/items", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }

    async UpdateItemAsync(itemId: string, updateData: ItemUm): Promise<void> {
        await clientHttpClient.put(`/api/items/${itemId}`, updateData);
    }

    async DeleteItemAsync(itemId: string): Promise<void> {
        await clientHttpClient.delete(`/api/items/${itemId}`);
    }

    async GetItemImageIdsAsync(itemId: string): Promise<Array<string>> {
        const res = await clientHttpClient.get<Array<string>>(`/api/items/images/${itemId}`);
        return res.data;
    }

    GetItemImageUrlAsync(imageId: string): string {
        return `/api/items/images/file/${imageId}`;
    }
}

const itemService = new ItemService();
export default itemService;
