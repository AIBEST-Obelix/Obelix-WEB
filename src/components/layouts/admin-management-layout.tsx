import {AdminsTable} from "@/components/components/admins-table";

export default async function AdminManagementLayout({ children }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <AdminsTable/>
      </div>
    </div>
  );
}