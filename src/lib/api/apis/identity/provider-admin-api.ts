import {AdminVm} from "@/lib/api/models/admin/admin-vm";
import apiHttpClient from "@/lib/api/http";
import {WebApi} from "@/lib/api/apis/web-api";
import {AxiosResponse} from "axios";
import {AdminIM} from "@/lib/api/models/admin/admin-im";

class ProviderAdminApi extends WebApi {
    async GetAllProviderAdminsAsync() : Promise<AxiosResponse<Array<AdminVm>>> {
        return await apiHttpClient.get("/api/identity/admin/provider", await this.generateHeader());
    }
        
    async CreateProviderAsync(adminIm: AdminIM) : Promise<AxiosResponse> {
        return await apiHttpClient.post("/api/identity/admin/provider", adminIm, await this.generateHeader());
    }
}

const providerAdminsApi = new ProviderAdminApi();
export default providerAdminsApi;