"use client";

import { ItemsTable } from "@/components/components/items-table";

export default function ItemManagementLayout() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Item Management</h1>
        <p className="text-gray-600 mt-2">Manage items in your inventory system</p>
      </div>

      <div className="flex-1">
        <ItemsTable />
      </div>
    </div>
  );
}
