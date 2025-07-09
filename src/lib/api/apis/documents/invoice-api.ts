// lib/api/apis/invoice/invoice-api.ts
import { WebApi } from "@/lib/api/apis/web-api";
import { AxiosResponse } from "axios";
import apiHttpClient from "@/lib/api/http";
import { InvoiceIM } from "@/lib/api/models/invoice/invoice-im";
import { InvoiceVM } from "@/lib/api/models/invoice/invoice-vm";
import { ValidationResult } from "../../models/invoice/validation-result";

export class InvoiceApi extends WebApi {
  public async CreateInvoiceAsync(invoiceIM: InvoiceIM): Promise<AxiosResponse<string>> {
    return await apiHttpClient.post<string>(
      "/api/documents/invoice",
      invoiceIM,
      await this.generateHeader()
    );
  }

  public async GetInvoiceByIdAsync(id: string): Promise<AxiosResponse<InvoiceVM>> {
    return await apiHttpClient.get<InvoiceVM>(
      `/api/documents/invoice/${id}`,
      await this.generateHeader()
    );
  }

  public async GetAllInvoicesAsync(isApproved: boolean = true, companyId?: string): Promise<AxiosResponse<InvoiceVM[]>> {
    return await apiHttpClient.get<InvoiceVM[]>(
      "/api/documents/invoice",
      {
        params: { isApproved, companyId },
        ...await this.generateHeader()
      }
    );
  }

  public async UpdateInvoiceAsync(invoiceId: string, invoiceIM: InvoiceIM): Promise<AxiosResponse<Response>> {
    return await apiHttpClient.put(
      `/api/documents/invoice/${invoiceId}`,
      invoiceIM,
      await this.generateHeader()
    );
  }

  public async DeleteInvoiceAsync(id: string): Promise<AxiosResponse<Response>> {
    return await apiHttpClient.delete(
      `/api/documents/invoice/${id}`,
      await this.generateHeader()
    );
  }

  public async RestoreInvoiceAsync(id: string): Promise<AxiosResponse<Response>> {
    return await apiHttpClient.put(
      `/api/documents/invoice/restore/${id}`,
      null,
      await this.generateHeader()
    );
  }

  public async GetAllDeletedInvoicesAsync(companyId?: string): Promise<AxiosResponse<InvoiceVM[]>> {
    return await apiHttpClient.get<InvoiceVM[]>(
      "/api/documents/invoice/deleted",
      {
        params: { companyId },
        ...await this.generateHeader()
      }
    );
  }

  public async AnalyzeInvoiceAsync(files: File[], companyId: string): Promise<AxiosResponse<InvoiceIM>> {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("companyId", companyId);
    return await apiHttpClient.post<InvoiceIM>(
      "/api/documents/invoice/analyze",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(await this.generateHeader().then(h => (h as { headers?: Record<string, string> }).headers ?? {}))
        }
      }
    );
  }

  public async UploadInvoiceAsync(file: File, invoiceId: string): Promise<AxiosResponse<Response>> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("invoiceId", invoiceId);

    const headers = {
      "Content-Type": "multipart/form-data",
      ...(await this.generateHeader().then(
        (h) => (h as { headers?: Record<string, string> }).headers ?? {}
      )),
    };

    return apiHttpClient.post(
      "/api/documents/invoicefile",
      formData,
      { headers }
    );
  }

  public async DownloadInvoiceFileAsync(
    invoiceFileId: string
  ): Promise<AxiosResponse<ArrayBuffer>> {
    return apiHttpClient.get<ArrayBuffer>(
      `/api/documents/invoicefile/${invoiceFileId}`,
      {
        responseType: "arraybuffer",
        headers: {
          ...(await this.generateHeader()
            .then(h => (h as any).headers ?? {})),
        },
      }
    );
  }

  public async ApproveInvoiceAsync(id: string): Promise<AxiosResponse<Response>> {
    return await apiHttpClient.post(
      `/api/documents/invoice/approve/${id}`,
      null,
      await this.generateHeader()
    );
  }

  public async ValidateInvoiceAsync(id: string): Promise<AxiosResponse<ValidationResult>> {
    return await apiHttpClient.post<ValidationResult>(
      `/api/documents/invoice/validate/${id}`,
      null,
      await this.generateHeader()
    );
  }
}

const invoiceApi = new InvoiceApi();
export default invoiceApi;
