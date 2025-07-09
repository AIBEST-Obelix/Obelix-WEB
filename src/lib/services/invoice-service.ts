import clientHttpClient from "@/lib/services/client-http";
import { InvoiceVM } from "../api/models/invoice/invoice-vm";
import { InvoiceIM } from "../api/models/invoice/invoice-im";
import { ValidationResult } from "../api/models/invoice/validation-result";

export class InvoiceService {
    async CreateInvoiceAsync(files: File[], companyId?: string): Promise<void> {
        const analyzeForm = new FormData();
        files.forEach((file) => analyzeForm.append("files", file));
        analyzeForm.append("companyId", companyId || "");

        const analyzeRes = await clientHttpClient.post(
          "/api/invoice/analyze",
          analyzeForm,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (analyzeRes.status !== 200) {
          throw new Error(`Unexpected status ${analyzeRes.status} from analyze`);
        }
        
        return analyzeRes.data;
  }

  async GetInvoiceByIdAsync(id: string): Promise<InvoiceVM> {
    const res = await clientHttpClient.get<InvoiceVM>(`/api/invoice/${id}`);
    return res.data;
  }

  async GetAllInvoicesAsync(): Promise<InvoiceVM[]> {
    const res = await clientHttpClient.get<InvoiceVM[]>("/api/invoice");
    return res.data;
  }

  async UpdateInvoiceAsync(invoiceId: string, InvoiceIM: InvoiceIM): Promise<void> {
    const res = await clientHttpClient.put(`/api/invoice/${invoiceId}`, InvoiceIM);
    
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async DeleteInvoiceAsync(id: string): Promise<void> {
    const res = await clientHttpClient.delete(`/api/invoice/${id}`);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async RestoreInvoiceAsync(id: string): Promise<void> {
    const res = await clientHttpClient.put(`/api/invoice/restore/${id}`);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async GetAllDeletedInvoicesAsync(): Promise<InvoiceVM[]> {
    const res = await clientHttpClient.get<InvoiceVM[]>("/api/invoice/deleted");
    return res.data;
  }

  async DownloadInvoiceFileAsync(invoiceFileId: string): Promise<Blob> {
    const res = await clientHttpClient.get<Blob>(
      `/api/invoice/files/${invoiceFileId}`,
      { responseType: "blob" }
    );
    return res.data;
  }

  async ApproveInvoiceAsync(id: string): Promise<void> {
    const res = await clientHttpClient.post(`/api/invoice/approve/${id}`);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  async ValidateFieldsAsync(invoiceId: string): Promise<ValidationResult> {
    const res = await clientHttpClient.post<ValidationResult>(
      `/api/invoice/validate/${invoiceId}`
    );
    if (res.status !== 200) {
      throw new Error(`Unexpected status ${res.status}`);
    }
    return res.data;
  }
}

const invoiceService = new InvoiceService();
export default invoiceService;
