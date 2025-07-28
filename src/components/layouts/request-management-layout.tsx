"use client"

import { RequestsTable } from "@/components/components/requests-table";

interface RequestManagementLayoutProps {
    children?: React.ReactNode;
}

export function RequestManagementLayout({ children }: RequestManagementLayoutProps) {
    return (
        <div className="container mx-auto py-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Request Management</h1>
                </div>

                <RequestsTable title="All Requests" />

                {children}
            </div>
        </div>
    );
}
