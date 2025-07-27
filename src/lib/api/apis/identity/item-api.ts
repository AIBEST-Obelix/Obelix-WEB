import { WebApi } from "@/lib/api/apis/web-api";
import { AxiosResponse } from "axios";
import apiHttpClient from "@/lib/api/http";
import { ItemVm } from "@/lib/api/models/item/item-vm";
import { ItemUm } from "@/lib/api/models/item/item-um";

export class ItemApi extends WebApi {
    public async GetAllItemsAsync(): Promise<AxiosResponse<Array<ItemVm>>> {
        return await apiHttpClient.get<Array<ItemVm>>("/api/items/Items", await this.generateHeader());
    }

    public async GetItemByIdAsync(itemId: string): Promise<AxiosResponse<ItemVm>> {
        return await apiHttpClient.get<ItemVm>(`/api/items/Items/${itemId}`, await this.generateHeader());
    }

    public async CreateItemAsync(formData: FormData): Promise<AxiosResponse<void>> {
        return await apiHttpClient.post("/api/items/Items", formData, await this.generateHeader(true));
    }

    public async UpdateItemAsync(itemId: string, itemUm: ItemUm): Promise<AxiosResponse<void>> {
        return await apiHttpClient.put(`/api/items/Items/${itemId}`, itemUm, await this.generateHeader());
    }

    public async DeleteItemAsync(itemId: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.delete(`/api/items/Items/${itemId}`, await this.generateHeader());
    }

    public async GetItemImageIdsAsync(itemId: string): Promise<AxiosResponse<Array<string>>> {
        return await apiHttpClient.get<Array<string>>(`/api/items/ItemsFile/item/${itemId}`, await this.generateHeader());
    }

    public async GetItemImageAsync(imageId: string): Promise<AxiosResponse<Blob>> {
        return await apiHttpClient.get(`/api/items/ItemsFile/stream/${imageId}`, {
            ...await this.generateHeader(),
            responseType: 'blob'
        });
    }
}

const itemApi = new ItemApi();
export default itemApi;
