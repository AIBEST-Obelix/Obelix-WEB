"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EditUserForm } from "@/components/forms/edit-user-form";
import { DeleteAdminForm } from "@/components/forms/delete-admin-form";
import { CreateAdminForm } from "@/components/forms/create-admin-form";
import { UserVm } from "@/lib/api/models/user/user-vm";
import userService from "@/lib/services/user-service";
import { ADMIN_TABLE_REFRESH_EVENT } from "@/lib/shared/constants";
import { toast } from "sonner";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";

export function AdminsTable() {
  const [admins, setAdmins] = useState<UserVm[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<UserVm | null>(null);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const admins = await userService.GetAllAdminsAsync();
      setAdmins(admins);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();

    const handleRefresh = () => {
      fetchAdmins();
    };

    window.addEventListener(ADMIN_TABLE_REFRESH_EVENT, handleRefresh);
    return () => {
      window.removeEventListener(ADMIN_TABLE_REFRESH_EVENT, handleRefresh);
    };
  }, []);

  const handleEdit = (admin: UserVm) => {
    setSelectedAdmin(admin);
    setEditDialogOpen(true);
  };

  const handleDelete = (admin: UserVm) => {
    setSelectedAdmin(admin);
    setDeleteDialogOpen(true);
  };

  const handleCreate = () => {
    setCreateDialogOpen(true);
  };

  const columns: ColumnDef<UserVm>[] = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const admin = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(admin)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(admin)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading administrators...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Administrators</h2>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Administrator
        </Button>
      </div>

      <DataTable
        columns={columns}
        originalData={admins}
        searchText="Search administrators..."
        tableRefreshEventKey={ADMIN_TABLE_REFRESH_EVENT}
      />

      {selectedAdmin && (
        <>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Administrator</DialogTitle>
                <DialogDescription>
                  Update administrator information
                </DialogDescription>
              </DialogHeader>
              <EditUserForm
                setOpen={setEditDialogOpen}
                user={{
                  email: selectedAdmin.email,
                  firstName: selectedAdmin.firstName,
                  lastName: selectedAdmin.lastName,
                }}
                userId={selectedAdmin.id}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Administrator</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this administrator?
                </DialogDescription>
              </DialogHeader>
              <DeleteAdminForm
                setOpen={setDeleteDialogOpen}
                adminUsername={selectedAdmin.email}
                adminId={selectedAdmin.id}
              />
            </DialogContent>
          </Dialog>
        </>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Administrator</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new administrator account
            </DialogDescription>
          </DialogHeader>
          <CreateAdminForm setOpen={setCreateDialogOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
