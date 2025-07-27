"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersTable } from "@/components/components/users-table";
import { AdminsTable } from "@/components/components/admins-table";

export default function UserManagementLayout() {
  return (
    <div className="flex flex-col h-full p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-gray-600 mt-2">
          Manage users and administrators in your system
        </p>
      </div>

      <Tabs defaultValue="users" className="flex-1">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="admins">Administrators</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <UsersTable />
        </TabsContent>

        <TabsContent value="admins" className="mt-6">
          <AdminsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}