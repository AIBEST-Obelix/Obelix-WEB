import { WebApi } from "@/lib/api/apis/web-api";
import apiHttpClient from "@/lib/api/http";
import { AccountIM } from "@/lib/api/models/account/account-im";
import { AccountVM } from "@/lib/api/models/account/account-vm";
import { AxiosResponse } from "axios";

export class AccountApi extends WebApi {
  public async CreateAccountAsync(
    im: AccountIM
  ): Promise<AxiosResponse<AccountVM>> {
    return apiHttpClient.post<AccountVM>(
      "/api/documents/account",
      im,
      await this.generateHeader()
    );
  }

  public async GetAllAccountsAsync(): Promise<AxiosResponse<AccountVM[]>> {
    return apiHttpClient.get<AccountVM[]>(
      "/api/documents/account",
      await this.generateHeader()
    );
  }

  public async GetAccountByIdAsync(id: string): Promise<AxiosResponse<AccountVM>> {
    return apiHttpClient.get<AccountVM>(
      `/api/documents/account/${id}`,
      await this.generateHeader()
    );
  }

  public async UpdateAccountAsync(
    id: string,
    im: AccountIM
  ): Promise<AxiosResponse<AccountVM>> {
    return apiHttpClient.put<AccountVM>(
      `/api/documents/account/${id}`,
      im,
      await this.generateHeader()
    );
  }

  public async DeleteAccountAsync(id: string): Promise<AxiosResponse<void>> {
    console.log("Deleting account with ID:", id);
    return apiHttpClient.delete<void>(
      `/api/documents/account/${id}`,
      await this.generateHeader()
    );
  }

  /** Restore a previously soft-deleted account */
  public async RestoreAccountAsync(
    id: string
  ): Promise<AxiosResponse<void>> {
    return apiHttpClient.put<void>(
      `/api/documents/account/restore/${id}`,
      null,
      await this.generateHeader()
    );
  }

  /** Get all soft-deleted accounts */
  public async GetDeletedAccountsAsync(): Promise<AxiosResponse<AccountVM[]>> {
    return apiHttpClient.get<AccountVM[]>(
      "/api/documents/account/deleted",
      await this.generateHeader()
    );
  }

  public async GetDefaultsAccountsAsync(): Promise<AxiosResponse<AccountVM[]>> {
    return apiHttpClient.get<AccountVM[]>(
      "/api/documents/account/defaults",
      await this.generateHeader()
    );
  }
}

export default new AccountApi();
