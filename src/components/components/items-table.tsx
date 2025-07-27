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
import { EditItemForm } from "@/components/forms/edit-item-form";
import { DeleteItemForm } from "@/components/forms/delete-item-form";
import { CreateItemForm } from "@/components/forms/create-item-form";
import { ItemVm } from "@/lib/api/models/item/item-vm";
import itemService from "@/lib/services/item-service";
import { ITEM_TABLE_REFRESH_EVENT } from "@/lib/shared/constants";
import { toast } from "sonner";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";
import { ItemImage } from "@/components/components/item-image";

export function ItemsTable() {
  const [items, setItems] = useState<ItemVm[]>([]);
  const [loading, setLoading] = useState(true);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemVm | null>(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const items = await itemService.GetAllItemsAsync();
      setItems(items);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();

    const handleRefresh = () => {
      fetchItems();
    };

    window.addEventListener(ITEM_TABLE_REFRESH_EVENT, handleRefresh);
    return () => {
      window.removeEventListener(ITEM_TABLE_REFRESH_EVENT, handleRefresh);
    };
  }, []);

  const handleEdit = (item: ItemVm) => {
    setSelectedItem(item);
    setEditDialogOpen(true);
  };

  const handleDelete = (item: ItemVm) => {
    setSelectedItem(item);
    setDeleteDialogOpen(true);
  };

  const handleCreate = () => {
    setCreateDialogOpen(true);
  };

  const columns: ColumnDef<ItemVm>[] = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => {
        const item = row.original;
        return <ItemImage itemId={item.id} />;
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "serialNumber",
      header: "Serial Number",
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => {
        const date = row.original.createdAt;
        return date ? new Date(date).toLocaleDateString() : "N/A";
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(item)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(item)}
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
        <div className="text-lg">Loading items...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Items</h2>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <DataTable
        columns={columns}
        originalData={items}
        searchText="Search items..."
        tableRefreshEventKey={ITEM_TABLE_REFRESH_EVENT}
      />

      {selectedItem && (
        <>
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Item</DialogTitle>
                <DialogDescription>
                  Update item information
                </DialogDescription>
              </DialogHeader>
              <EditItemForm
                setOpen={setEditDialogOpen}
                item={{
                  name: selectedItem.name,
                  type: selectedItem.type,
                  serialNumber: selectedItem.serialNumber,
                }}
                itemId={selectedItem.id}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Item</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this item?
                </DialogDescription>
              </DialogHeader>
              <DeleteItemForm
                setOpen={setDeleteDialogOpen}
                itemName={selectedItem.name}
                itemId={selectedItem.id}
              />
            </DialogContent>
          </Dialog>
        </>
      )}

      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Item</DialogTitle>
            <DialogDescription>
              Upload an image to analyze and create a new item
            </DialogDescription>
          </DialogHeader>
          <CreateItemForm setOpen={setCreateDialogOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
}
