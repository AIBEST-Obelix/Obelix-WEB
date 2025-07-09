import {WebApi} from "@/lib/api/apis/web-api";
import {AxiosResponse} from "axios";
import apiHttpClient from "@/lib/api/http";
import {TokensIM} from "@/lib/api/models/token/token-im";
import {UserIm} from "@/lib/api/models/user/user-im";

export class AuthApi extends WebApi {
    public async LoginAsync(userIm: UserIm): Promise<AxiosResponse<void>> {
        return await apiHttpClient.post("/api/identity/auth/login", userIm, await this.generateHeader());
    }

    public async CreateAdminAsync(userIm: UserIm): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.post<Response>("/api/identity/auth/register/admin", userIm, await this.generateHeader())
    }
    
    public async CreateAccountantAsync(userIm: UserIm): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.post<Response>("/api/identity/auth/register/accountant", userIm, await this.generateHeader())
    }
    
    public async CreateUserAsync(userIm: UserIm): Promise<AxiosResponse<Response>> {
        return await apiHttpClient.post<Response>("/api/identity/auth/register/user", userIm, await this.generateHeader())
    }

    public async RenewTokenAsync(tokensIm: TokensIM): Promise<AxiosResponse<void>> {
        return await apiHttpClient.post<void>("/api/identity/auth/renew", tokensIm, await this.generateHeader())
    }
}

const authApi = new AuthApi();
export default authApi;