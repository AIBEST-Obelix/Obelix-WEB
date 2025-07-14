import userApi from "@/lib/api/apis/identity/user-api";
import NavbarClient from "@/components/layouts/navbar-client";

export default async function Navbar () {
    const userInfoRes = await userApi.GetCurrentUserInfoAsync();

    return (
        <NavbarClient
            userInfo={userInfoRes.data} />
    );
} 