import { RequestVm } from "@/lib/api/models/request/request-vm";
import { RequestIm } from "@/lib/api/models/request/request-im";
import apiHttpClient from "@/lib/api/http";

export class RequestService {
    async GetRequestByIdAsync(requestId: string): Promise<RequestVm> {
        const res = await apiHttpClient.get<RequestVm>(`/api/Request/${requestId}`);
        return res.data;
    }

    async GetAllRequestsAsync(): Promise<Array<RequestVm>> {
        const res = await apiHttpClient.get<Array<RequestVm>>("/api/Request");
        return res.data;
    }

    async GetRequestsByStatusAsync(status: string): Promise<Array<RequestVm>> {
        const res = await apiHttpClient.get<Array<RequestVm>>(`/api/Request/status/${status}`);
        return res.data;
    }

    async GetRequestsByUserIdAsync(userId: string): Promise<Array<RequestVm>> {
        const res = await apiHttpClient.get<Array<RequestVm>>(`/api/Request/user/${userId}`);
        return res.data;
    }

    async GetMyRequestsAsync(): Promise<Array<RequestVm>> {
        const res = await apiHttpClient.get<Array<RequestVm>>("/api/Request/my");
        return res.data;
    }

    async GetDeletedRequestsAsync(): Promise<Array<RequestVm>> {
        const res = await apiHttpClient.get<Array<RequestVm>>("/api/Request/deleted");
        return res.data;
    }

    async CreateRequestAsync(requestIm: RequestIm): Promise<void> {
        await apiHttpClient.post("/api/Request", requestIm);
    }

    async UpdateRequestAsync(requestId: string, requestIm: RequestIm): Promise<void> {
        await apiHttpClient.put(`/api/Request/${requestId}`, requestIm);
    }

    async DeleteRequestAsync(requestId: string): Promise<void> {
        await apiHttpClient.delete(`/api/Request/${requestId}`);
    }

    async ApproveRequestAsync(requestId: string): Promise<void> {
        await apiHttpClient.patch(`/api/Request/${requestId}/approve`);
    }

    async RejectRequestAsync(requestId: string): Promise<void> {
        await apiHttpClient.patch(`/api/Request/${requestId}/reject`);
    }

    async MarkAsReturnedAsync(requestId: string): Promise<void> {
        await apiHttpClient.patch(`/api/Request/${requestId}/return`);
    }

    async GetItemsAsync(): Promise<Array<any>> {
        const res = await apiHttpClient.get<Array<any>>("/api/Request/items");
        return res.data;
    }
}

const requestService = new RequestService();
export default requestService; 