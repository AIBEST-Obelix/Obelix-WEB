import clientHttpClient from "@/lib/services/client-http";
import { CompanyIM } from "@/lib/api/models/company/company-im";
import { CompanyVM } from "@/lib/api/models/company/company-vm";

export class CompanyService {
  async CreateCompanyAsync(companyIM: CompanyIM): Promise<void> {
    const res = await clientHttpClient.post("/api/company/company", companyIM);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async GetCompanyByUicAsync(uic: string): Promise<CompanyVM> {
    const res = await clientHttpClient.get<CompanyVM>(`/api/company/company/${uic}`);
    return res.data;
  }

  async GetAllCompaniesAsync(): Promise<CompanyVM[]> {
    const res = await clientHttpClient.get<CompanyVM[]>("/api/company/company");
    return res.data;
  }

  async UpdateCompanyAsync(companyIM: CompanyIM): Promise<void> {
    const res = await clientHttpClient.put("/api/company/company", companyIM);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async DeleteCompanyAsync(uic: string): Promise<void> {
    const res = await clientHttpClient.delete(`/api/company/company/${uic}`);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async RestoreCompanyAsync(uic: string): Promise<void> {
    const res = await clientHttpClient.put(`/api/company/company/restore/${uic}`);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async GetAllDeletedCompaniesAsync(): Promise<CompanyVM[]> {
    const res = await clientHttpClient.get<CompanyVM[]>("/api/company/company/deleted");
    return res.data;
  }
}

const companyService = new CompanyService();
export default companyService;
