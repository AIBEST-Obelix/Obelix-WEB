import {getCompanyId} from "@/lib/misc/server-context";
import userApi from "@/lib/api/apis/identity/user-api";
import AdminNavbarClient from "./admin-navbar-client";
import companyApi from "@/lib/api/apis/company/company-api";

export default async function AdminNavbar () {
    const userInfoRes = await userApi.GetCurrentUserInfoAsync();
    const companyRes = await companyApi.GetAllCompaniesAsync();
    const currentCompanyId = getCompanyId();

    return (
        <AdminNavbarClient
            currentCompanyId={currentCompanyId}
            companies={companyRes.data}
            userInfo={userInfoRes.data} />
    );
} 