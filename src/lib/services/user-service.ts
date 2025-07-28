import {UserVm} from "@/lib/api/models/user/user-vm";
import clientHttpClient from "@/lib/services/client-http";
import {UserUm} from "@/lib/api/models/user/user-um";

export class UserService {
    async GetCurrentUserInfoAsync() : Promise<UserVm> {
        const res = await clientHttpClient.get<UserVm>("/api/user/current");
        return res.data;
    }

    async GetAllAdminsAsync() : Promise<Array<UserVm>> {
        const res = await clientHttpClient.get<Array<UserVm>>("/api/user/admin");
        return res.data;
    }
    
    async GetAllUsersAsync() : Promise<Array<UserVm>> {
        const res = await clientHttpClient.get<Array<UserVm>>("/api/user/user");
        return res.data;
    }

    async UpdateUserAsync(userId: string, updateData: {email: string, password?: string, firstName: string, lastName: string}) : Promise<void> {
        await clientHttpClient.put(`/api/user/${userId}`, updateData);
    }

    async DeleteUserAsync(userId: string) : Promise<void> {
        await clientHttpClient.delete(`/api/user/${userId}`);
    }
}

const userService = new UserService();
export default userService;
