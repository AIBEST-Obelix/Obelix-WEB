"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import { DeleteUserForm } from "@/components/forms/delete-user-form";
import { CreateUserForm } from "@/components/forms/create-user-form";
import { UserVm } from "@/lib/api/models/user/user-vm";
import userService from "@/lib/services/user-service";
import { USER_TABLE_REFRESH_EVENT } from "@/lib/shared/constants";
import { toast } from "sonner";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";

export function UsersTable() {
  const [users, setUsers] = useState<UserVm[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserVm | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await userService.GetAllUsersAsync();
      setUsers(users);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const handleRefresh = () => {
      fetchUsers();
    };

    window.addEventListener(USER_TABLE_REFRESH_EVENT, handleRefresh);
    return () => {
      window.removeEventListener(USER_TABLE_REFRESH_EVENT, handleRefresh);
    };
  }, []);

  const handleEdit = (user: UserVm) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleDelete = (user: UserVm) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
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
        const user = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(user)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(user)}
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
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Users</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          Add User
        </Button>
      </div>

      <DataTable
        columns={columns}
        originalData={users}
        searchText="Search users..."
        tableRefreshEventKey={USER_TABLE_REFRESH_EVENT}
      />

      {selectedUser && (
        <>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit User</DialogTitle>
                <DialogDescription>
                  Update user information
                </DialogDescription>
              </DialogHeader>
              <EditUserForm
                setOpen={setEditDialogOpen}
                user={{
                  email: selectedUser.email,
                  firstName: selectedUser.firstName,
                  lastName: selectedUser.lastName,
                }}
                userId={selectedUser.id}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this user?
                </DialogDescription>
              </DialogHeader>
              <DeleteUserForm
                setOpen={setDeleteDialogOpen}
                username={selectedUser.email}
                userId={selectedUser.id}
              />
            </DialogContent>
          </Dialog>
        </>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account
            </DialogDescription>
          </DialogHeader>
          <CreateUserForm setOpen={setCreateDialogOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}