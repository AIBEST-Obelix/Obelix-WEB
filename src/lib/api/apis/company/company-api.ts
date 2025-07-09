import { WebApi } from "@/lib/api/apis/web-api";
import { AxiosResponse } from "axios";
import apiHttpClient from "@/lib/api/http";
import { CompanyIM } from "@/lib/api/models/company/company-im";
import { CompanyVM } from "@/lib/api/models/company/company-vm";

class CompanyApi extends WebApi {
    public async CreateCompanyAsync(companyIM: CompanyIM): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.post("/api/companies/company", companyIM, await this.generateHeader());
    }

    public async GetCompanyByUicAsync(uic: string): Promise<AxiosResponse<CompanyVM>> {
        return await apiHttpClient.get<CompanyVM>(`/api/companies/company/${uic}`, await this.generateHeader());
    }

    public async GetAllCompaniesAsync(): Promise<AxiosResponse<Array<CompanyVM>>> {
        return await apiHttpClient.get<Array<CompanyVM>>("/api/companies/company", await this.generateHeader());
    }

    public async UpdateCompanyAsync(companyIM: CompanyIM): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.put("/api/companies/company", companyIM, await this.generateHeader());
    }

    public async DeleteCompanyAsync(uic: string): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.delete(`/api/companies/company/${uic}`, await this.generateHeader());
    }

    public async RestoreCompanyAsync(uic: string): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.put(`/api/companies/company/restore/${uic}`, null, await this.generateHeader());
    }

    public async GetAllDeletedCompaniesAsync(): Promise<AxiosResponse<Array<CompanyVM>>> {
        return await apiHttpClient.get<Array<CompanyVM>>("/api/companies/company/deleted", await this.generateHeader());
    }
}

const companyApi = new CompanyApi();
export default companyApi;