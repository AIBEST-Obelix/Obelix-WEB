import { AxiosResponse } from "axios";
import apiHttpClient from "../../http";
import { RequestVm } from "../../models/request/request-vm";
import { RequestIm } from "../../models/request/request-im";

export class RequestApi {
    public async GetAllRequestsAsync(): Promise<AxiosResponse<RequestVm[]>> {
        return await apiHttpClient.get<RequestVm[]>("/api/requests/Request");
    }

    public async GetRequestByIdAsync(id: string): Promise<AxiosResponse<RequestVm>> {
        return await apiHttpClient.get<RequestVm>(`/api/requests/Request/${id}`);
    }

    public async GetRequestsByStatusAsync(status: string): Promise<AxiosResponse<RequestVm[]>> {
        return await apiHttpClient.get<RequestVm[]>(`/api/requests/Request/status/${status}`);
    }

    public async GetRequestsByUserIdAsync(userId: string): Promise<AxiosResponse<RequestVm[]>> {
        return await apiHttpClient.get<RequestVm[]>(`/api/requests/Request/user/${userId}`);
    }

    public async GetMyRequestsAsync(): Promise<AxiosResponse<RequestVm[]>> {
        return await apiHttpClient.get<RequestVm[]>("/api/requests/Request/my");
    }

    public async GetDeletedRequestsAsync(): Promise<AxiosResponse<RequestVm[]>> {
        return await apiHttpClient.get<RequestVm[]>("/api/requests/Request/deleted");
    }

    public async CreateRequestAsync(requestData: RequestIm): Promise<AxiosResponse<RequestVm>> {
        return await apiHttpClient.post<RequestVm>("/api/requests/Request", requestData);
    }

    public async UpdateRequestAsync(id: string, requestData: RequestIm): Promise<AxiosResponse<RequestVm>> {
        return await apiHttpClient.put<RequestVm>(`/api/requests/Request/${id}`, requestData);
    }

    public async DeleteRequestAsync(id: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.delete<void>(`/api/requests/Request/${id}`);
    }

    public async ApproveRequestAsync(id: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.patch<void>(`/api/requests/Request/${id}/approve`, {});
    }

    public async RejectRequestAsync(id: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.patch<void>(`/api/requests/Request/${id}/reject`, {});
    }

    public async ReturnRequestAsync(id: string): Promise<AxiosResponse<void>> {
        return await apiHttpClient.patch<void>(`/api/requests/Request/${id}/return`, {});
    }
}
