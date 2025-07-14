import userApi from "@/lib/api/apis/identity/user-api";
import AdminNavbarClient from "./admin-navbar-client";

export default async function AdminNavbar () {
    const userInfoRes = await userApi.GetCurrentUserInfoAsync();

    return (
        <AdminNavbarClient
            userInfo={userInfoRes.data} />
    );
} 