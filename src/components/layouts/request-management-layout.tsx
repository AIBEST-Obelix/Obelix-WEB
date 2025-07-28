"use client";

import { RequestsTable } from "@/components/components/requests-table";

export default function RequestManagementLayout() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Request Management</h1>
        <p className="text-gray-600 mt-2">Manage item requests in your system</p>
      </div>

      <div className="flex-1">
        <RequestsTable />
      </div>
    </div>
  );
} 