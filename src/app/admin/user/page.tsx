import {Card, CardContent} from "@/components/ui/card";
import UserManagementTabs from "@/components/layouts/user-management-tabs";

export default async function UserManagementDashboard() {
    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            <Card>
                <CardContent className="pt-6">
                    <UserManagementTabs/>
                </CardContent>
            </Card>
        </main>
    );
}