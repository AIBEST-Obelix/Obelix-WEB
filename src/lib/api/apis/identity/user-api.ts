import {WebApi} from "@/lib/api/apis/web-api";
import {AxiosResponse} from "axios";
import apiHttpClient from "@/lib/api/http";
import {UpdatePasswordModel} from "@/lib/api/models/update-password-model";
import {UserUm} from "@/lib/api/models/user/user-um";
import {UserVm} from "@/lib/api/models/user/user-vm";

class UserApi extends WebApi {
    public async GetCurrentUserInfoAsync(): Promise<AxiosResponse<UserVm>> {
        return await apiHttpClient.get<UserVm>("/api/identity/user/current", await this.generateHeader());
    }

    public async ChangePasswordAsync(updatePasswordModel: UpdatePasswordModel): Promise<void> {
        return await apiHttpClient.post("/api/identity/user/change-password", updatePasswordModel, await this.generateHeader());
    }

    public async UpdateUserInfoAsync(userId: string, userUm: UserUm): Promise<void> {
        return await apiHttpClient.put(`/api/identity/user/${userId}`, userUm, await this.generateHeader());
    }

    public async GetAllAdminsAsync(): Promise<AxiosResponse<Array<UserVm>>> {
        return await apiHttpClient.get<Array<UserVm>>("/api/identity/user/admin", await this.generateHeader());
    }
    
    public async GetAllUsersAsync(): Promise<AxiosResponse<Array<UserVm>>> {
        return await apiHttpClient.get<Array<UserVm>>("/api/identity/user/user", await this.generateHeader());
    }

    public async DeleteUserAsync(userId: string): Promise<void> {
        return await apiHttpClient.delete(`/api/identity/user/${userId}`, await this.generateHeader());
    }
}

const userApi = new UserApi();
export default userApi;