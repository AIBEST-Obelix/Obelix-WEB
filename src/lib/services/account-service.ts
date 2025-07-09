import clientHttpClient from "@/lib/services/client-http";
import { AccountIM } from "@/lib/api/models/account/account-im";
import { AccountVM } from "@/lib/api/models/account/account-vm";
import type { AxiosResponse } from "axios";

export class AccountService {
  /** POST   /api/account */
  async CreateAccountAsync(accountIM: AccountIM): Promise<void> {
    const res = await clientHttpClient.post("/api/account", accountIM);
    if (res.status !== 201) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  /** GET    /api/account */
  async GetAllAccountsAsync(): Promise<AccountVM[]> {
    const res = await clientHttpClient.get<AccountVM[]>(
      "/api/account"
    );
    return res.data;
  }

  /** GET    /api/account/{id} */
  async GetAccountByIdAsync(id: string): Promise<AccountVM> {
    const res: AxiosResponse<AccountVM> = await clientHttpClient.get(
      `/api/account/${id}`
    );
    return res.data;
  }

  /** PUT    /api/account/{id} */
  async UpdateAccountAsync(id: string, accountIM: AccountIM): Promise<void> {
    const res = await clientHttpClient.put(
      `/api/account/${id}`,
      accountIM
    );
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  /** DELETE /api/account/{id} */
  async DeleteAccountAsync(id: string): Promise<void> {
    const res = await clientHttpClient.delete(`/api/account/${id}`);
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  /** PUT    /api/documents/account/restore/{id} */
  async RestoreAccountAsync(id: string): Promise<void> {
    const res = await clientHttpClient.put(
      `/api/account/restore/${id}`
    );
    if (res.status !== 200) {
      throw new Error(res.data?.error || `Unexpected status ${res.status}`);
    }
  }

  /** GET    /api/documents/account/deleted */
  async GetDeletedAccountsAsync(): Promise<AccountVM[]> {
    const res = await clientHttpClient.get<AccountVM[]>(
      "/api/account/deleted"
    );
    return res.data;
  }
}

const accountService = new AccountService();
export default accountService;
