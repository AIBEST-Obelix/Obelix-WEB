import clientHttpClient from "@/lib/services/client-http";
import {UserIm} from "@/lib/api/models/user/user-im";

export class AuthService {
    async LoginAsync(userIm: UserIm) {
        const res = await clientHttpClient.post("/api/auth/login", userIm);

        if (res.status !== 200) {
            throw new Error(res.data.error);
        }
    }
    
    async RenewTokenAsync() {
        const res = await clientHttpClient.get("/api/auth/renew");

        if (res.status !== 200) {
            throw new Error(res.data.error);
        }
    }
    
    async LogoutAsync() {
        const res = await clientHttpClient.post("/api/auth/logout");

        if (res.status !== 200) {
            throw new Error(res.data.error);
        }
    }
    
    async CreateAdminAsync(userIm: UserIm) {
        const res = await clientHttpClient.post("/api/auth/register/admin", userIm);

        if (res.status !== 200) {
            throw new Error(res.data.error);
        }
    }
    
    async CreateAccountantAsync(userIm: UserIm) {
        const res = await clientHttpClient.post("/api/auth/register/accountant", userIm);

        if (res.status !== 200) {
            throw new Error(res.data.error);
        }
    }
    
    async CreateUserAsync(userIm: UserIm) {
        const res = await clientHttpClient.post("/api/auth/register/user", userIm);

        if (res.status !== 200) {
            throw new Error(res.data.error);
        }
    }
}

const adminAuthService = new AuthService();
export default adminAuthService;
