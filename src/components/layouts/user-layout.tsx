import Navbar from "@/components/layouts/navbar";
import {getCompanyId} from "@/lib/misc/server-context";
import {cookies} from "next/headers";
import {SELECTED_COMPANY_ID_KEY} from "@/lib/shared/constants";

export default async function UserLayout() {
    const companyId = (await cookies()).get(SELECTED_COMPANY_ID_KEY)?.value;
    return (
        <>
            <Navbar />
            <p>
                You are user!
                <br/>
                {companyId ? 
                    <span> Current company: {companyId}</span> :
                    <span> No company selected</span>
                }
            </p>
        </>
    );
}