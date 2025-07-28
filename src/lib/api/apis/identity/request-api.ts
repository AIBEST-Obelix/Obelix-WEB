import { WebApi } from "@/lib/api/apis/web-api";
import { AxiosResponse } from "axios";
import apiHttpClient from "@/lib/api/http";
import { RequestVm } from "@/lib/api/models/request/request-vm";
import { RequestIm } from "@/lib/api/models/request/request-im";

export class RequestApi extends WebApi {
    public async GetRequestByIdAsync(requestId: string): Promise<AxiosResponse<RequestVm>> {
        return await apiHttpClient.get<RequestVm>(`/api/Request/${requestId}`, await this.generateHeader());
    }

    public async GetAllRequestsAsync(): Promise<AxiosResponse<Array<RequestVm>>> {
        return await apiHttpClient.get<Array<RequestVm>>("/api/Request", await this.generateHeader());
    }

    public async GetRequestsByStatusAsync(status: string): Promise<AxiosResponse<Array<RequestVm>>> {
        return await apiHttpClient.get<Array<RequestVm>>(`/api/Request/status/${status}`, await this.generateHeader());
    }

    public async GetRequestsByUserIdAsync(userId: string): Promise<AxiosResponse<Array<RequestVm>>> {
        return await apiHttpClient.get<Array<RequestVm>>(`/api/Request/user/${userId}`, await this.generateHeader());
    }

    public async GetMyRequestsAsync(): Promise<AxiosResponse<Array<RequestVm>>> {
        return await apiHttpClient.get<Array<RequestVm>>("/api/Request/my", await this.generateHeader());
    }

    public async GetDeletedRequestsAsync(): Promise<AxiosResponse<Array<RequestVm>>> {
        return await apiHttpClient.get<Array<RequestVm>>("/api/Request/deleted", await this.generateHeader());
    }

    public async CreateRequestAsync(requestIm: RequestIm): Promise<AxiosResponse<void>> {
        return await apiHttpClient.post("/api/Request", requestIm, await this.generateHeader());
    }

    public async UpdateRequestAsync(requestId: string, requestIm: RequestIm): Promise<AxiosResponse<void>> {
        return await apiHttpClient.put(`/api/Request/${requestId}`, requestIm, await this.generateHeader());
    }

    public async DeleteRequestAsync(requestId: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.delete(`/api/Request/${requestId}`, await this.generateHeader());
    }

    public async ApproveRequestAsync(requestId: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.patch(`/api/Request/${requestId}/approve`, {}, await this.generateHeader());
    }

    public async RejectRequestAsync(requestId: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.patch(`/api/Request/${requestId}/reject`, {}, await this.generateHeader());
    }

    public async MarkAsReturnedAsync(requestId: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.patch(`/api/Request/${requestId}/return`, {}, await this.generateHeader());
    }

    public async GetItemsAsync(): Promise<AxiosResponse<Array<any>>> {
        return await apiHttpClient.get<Array<any>>("/api/Request/items", await this.generateHeader());
    }
}

const requestApi = new RequestApi();
export default requestApi; 