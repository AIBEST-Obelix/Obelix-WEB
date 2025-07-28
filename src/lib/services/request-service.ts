import { RequestVm } from "@/lib/api/models/request/request-vm";
import { RequestIm } from "@/lib/api/models/request/request-im";
import clientHttpClient from "@/lib/services/client-http";

export class RequestService {
    async GetAllRequestsAsync(): Promise<RequestVm[]> {
        const response = await clientHttpClient.get<RequestVm[]>("/api/requests");
        return response.data;
    }

    async GetRequestByIdAsync(id: string): Promise<RequestVm> {
        const response = await clientHttpClient.get<RequestVm>(`/api/requests/${id}`);
        return response.data;
    }

    async CreateRequestAsync(requestData: RequestIm): Promise<RequestVm> {
        const response = await clientHttpClient.post<RequestVm>("/api/requests", requestData);
        return response.data;
    }

    async UpdateRequestAsync(id: string, requestData: RequestIm): Promise<RequestVm> {
        const response = await clientHttpClient.put<RequestVm>(`/api/requests/${id}`, requestData);
        return response.data;
    }

    async DeleteRequestAsync(id: string): Promise<void> {
        await clientHttpClient.delete(`/api/requests/${id}`);
    }

    async ApproveRequestAsync(id: string): Promise<void> {
        await clientHttpClient.patch(`/api/requests/${id}/approve`);
    }

    async RejectRequestAsync(id: string): Promise<void> {
        await clientHttpClient.patch(`/api/requests/${id}/reject`);
    }

    async ReturnRequestAsync(id: string): Promise<void> {
        await clientHttpClient.patch(`/api/requests/${id}/return`);
    }
}

const requestService = new RequestService();
export default requestService;
