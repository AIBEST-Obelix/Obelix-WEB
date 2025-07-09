import clientHttpClient from "@/lib/services/client-http";
import { AssignUserToCompanyIm } from "../api/models/company/assign-user-to-company-im";
import { UserCompanyVm } from "../api/models/user/user-company-vm";

export class CompanyUserService {
    async AssignUserToCompanyAsync(assignUserToCompanyIM: AssignUserToCompanyIm): Promise<void> {
        const res = await clientHttpClient.post("/api/company-user/assign", assignUserToCompanyIM);
        if (res.status !== 200) {
            throw new Error(res.data?.error || `Unexpected status ${res.status}`);
        }
    }
    
    async RemoveUserFromCompanyAsync(assignUserToCompanyIM: AssignUserToCompanyIm): Promise<void> {
        const res = await clientHttpClient.post("/api/company-user/unassign", assignUserToCompanyIM);
        if (res.status !== 200) {
            throw new Error(res.data?.error || `Unexpected status ${res.status}`);
        }
    }
    
    async GetUsersForCompanyAsync(companyId: string): Promise<UserCompanyVm[]> {
        const res = await clientHttpClient.get<UserCompanyVm[]>(`/api/company-user/users/${companyId}`);
        return res.data;
    }
}

const companyUserService = new CompanyUserService();
export default companyUserService;
