import {getCompanyId} from "@/lib/misc/server-context";
import userApi from "@/lib/api/apis/identity/user-api";
import companyApi from "@/lib/api/apis/company/company-api";
import NavbarClient from "@/components/layouts/navbar-client";
import {cookies} from "next/headers";
import {SELECTED_COMPANY_ID_KEY} from "@/lib/shared/constants";
import companyUserApi from "@/lib/api/apis/identity/company-user-api";
import {CompanyVM} from "@/lib/api/models/company/company-vm";

export default async function Navbar () {
    const userInfoRes = await userApi.GetCurrentUserInfoAsync();
    const companyRes = await companyUserApi.GetCurrentUserCompaniesAsync();
    const currentCompanyId = (await cookies()).get(SELECTED_COMPANY_ID_KEY)?.value;
    
    const companies = new Array<CompanyVM>();
    
    for (const companyId of companyRes.data) {
        const company = await companyApi.GetCompanyByUicAsync(companyId);
        
        if (company) {
            companies.push(company.data);
        }
    }


    return (
        <NavbarClient
            currentCompanyId={currentCompanyId ?? ""}
            companies={companies}
            userInfo={userInfoRes.data} />
    );
} 