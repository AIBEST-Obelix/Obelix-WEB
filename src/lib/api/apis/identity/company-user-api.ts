import {WebApi} from "@/lib/api/apis/web-api";
import { AxiosResponse } from "axios";
import apiHttpClient from "@/lib/api/http";
import { AssignUserToCompanyIm } from "../../models/company/assign-user-to-company-im";
import {CompanyVM} from "@/lib/api/models/company/company-vm";

class CompanyUserApi extends WebApi {
    public async AssignUserToCompanyAsync(assignUserToCompanyIM: AssignUserToCompanyIm): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.post("/api/identity/company/assign", assignUserToCompanyIM, await this.generateHeader());
    }

    public async RemoveUserFromCompanyAsync(assignUserToCompanyIM: AssignUserToCompanyIm): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.post("/api/identity/company/assign/unassign", assignUserToCompanyIM, await this.generateHeader());
    }

    public async GetUsersForCompanyAsync(companyId: string): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.get(`/api/identity/company/assign/company/${companyId}/users`, await this.generateHeader());
    }
    
    public async GetCurrentUserCompaniesAsync(): Promise<AxiosResponse<string[]>> {
        return await apiHttpClient.get("/api/identity/company/assign/current", await this.generateHeader());
    }
}

const companyUserApi = new CompanyUserApi();
export default companyUserApi;