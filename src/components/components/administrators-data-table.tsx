import {DataTable} from "@/components/ui/data-table";
import {PlusCircle} from "lucide-react";
import userApi from "@/lib/api/apis/identity/user-api";
import {ResponsiveDialog} from "@/components/layouts/responsive-dialog";
import {adminVmColumn} from "@/components/components/admin-vm-column";
import {ADMIN_TABLE_REFRESH_EVENT} from "@/lib/shared/constants";
import {CreateAdminForm} from "@/components/forms/create-admin-form";

export default async function AdministratorsDataTable() {
    const admins = await userApi.GetAllAdminsAsync();

    return (
        <DataTable
            originalData={admins.data}
            columns={adminVmColumn}
            refetchUrl="/api/user/admin"
            searchText="Търси по име на администратор"
            createElement={
                <ResponsiveDialog
                    buttonVariant={"default"}
                    buttonIcon={<PlusCircle className={"h-5 w-5"}/>}
                    buttonTitle={"Създай нов администратор"}
                    dialogTitle={"Създай нов администратор"}
                    dialogDescription={`Щракнете върху създаване, когато сте готови.`}
                    form={
                        <CreateAdminForm />
                    }
                />
            }
            tableRefreshEventKey={ADMIN_TABLE_REFRESH_EVENT}
        />
    );
}
