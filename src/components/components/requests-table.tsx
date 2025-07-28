"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, CheckCircle, XCircle, RotateCcw, Trash2, Edit } from "lucide-react";
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
import { RequestVm } from "@/lib/api/models/request/request-vm";
import requestService from "@/lib/services/request-service";
import { CreateRequestForm } from "@/components/forms/create-request-form";
import { toast } from "sonner";
import ErrorHandler from "@/lib/error-handlers/ErrorHandler";
import { AxiosError } from "axios";

const REQUEST_TABLE_REFRESH_EVENT = "request-table-refresh";

export function RequestsTable() {
  const [requests, setRequests] = useState<RequestVm[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RequestVm | null>(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const requests = await requestService.GetAllRequestsAsync();
      setRequests(requests);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();

    const handleRefresh = () => {
      fetchRequests();
    };

    window.addEventListener(REQUEST_TABLE_REFRESH_EVENT, handleRefresh);
    return () => {
      window.removeEventListener(REQUEST_TABLE_REFRESH_EVENT, handleRefresh);
    };
  }, []);

  const handleApprove = async (request: RequestVm) => {
    try {
      await requestService.ApproveRequestAsync(request.id);
      toast.success("Request approved successfully");
      fetchRequests();
      setApproveDialogOpen(false);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    }
  };

  const handleReject = async (request: RequestVm) => {
    try {
      await requestService.RejectRequestAsync(request.id);
      toast.success("Request rejected successfully");
      fetchRequests();
      setRejectDialogOpen(false);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    }
  };

  const handleReturn = async (request: RequestVm) => {
    try {
      await requestService.MarkAsReturnedAsync(request.id);
      toast.success("Request marked as returned successfully");
      fetchRequests();
      setReturnDialogOpen(false);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    }
  };

  const handleDelete = async (request: RequestVm) => {
    try {
      await requestService.DeleteRequestAsync(request.id);
      toast.success("Request deleted successfully");
      fetchRequests();
      setDeleteDialogOpen(false);
    } catch (error) {
      const msg = ErrorHandler.HandleUserError(error as AxiosError);
      toast.error(msg);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "approved":
        return <Badge variant="default" className="bg-green-500">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "returned":
        return <Badge variant="outline">Returned</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const columns: ColumnDef<RequestVm>[] = [
    {
      accessorKey: "userName",
      header: "User",
    },
    {
      accessorKey: "itemName",
      header: "Item",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return getStatusBadge(status);
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const request = row.original;
        const status = request.status.toLowerCase();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {status === "pending" && (
                <>
                  <DropdownMenuItem onClick={() => {
                    setSelectedRequest(request);
                    setApproveDialogOpen(true);
                  }}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    setSelectedRequest(request);
                    setRejectDialogOpen(true);
                  }}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </DropdownMenuItem>
                </>
              )}
              {status === "approved" && (
                <DropdownMenuItem onClick={() => {
                  setSelectedRequest(request);
                  setReturnDialogOpen(true);
                }}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Mark as Returned
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRequest(request);
                  setDeleteDialogOpen(true);
                }}
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
        <div className="text-lg">Loading requests...</div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Requests</h2>
        <Button onClick={() => setCreateDialogOpen(true)}>
          Create Request
        </Button>
      </div>

      <DataTable
        columns={columns}
        originalData={requests}
        searchText="Search requests..."
        tableRefreshEventKey={REQUEST_TABLE_REFRESH_EVENT}
      />

      {selectedRequest && (
        <>
          <Dialog open={approveDialogOpen} onOpenChange={setApproveDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Approve Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to approve this request for {selectedRequest.userName}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setApproveDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleApprove(selectedRequest)}>
                  Approve
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reject Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to reject this request for {selectedRequest.userName}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setRejectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => handleReject(selectedRequest)}>
                  Reject
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={returnDialogOpen} onOpenChange={setReturnDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Mark as Returned</DialogTitle>
                <DialogDescription>
                  Are you sure you want to mark this request as returned for {selectedRequest.userName}?
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setReturnDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleReturn(selectedRequest)}>
                  Mark as Returned
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Request</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this request? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(selectedRequest)}>
                  Delete
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Request</DialogTitle>
                <DialogDescription>
                  Create a new request for an item
                </DialogDescription>
              </DialogHeader>
              <CreateRequestForm setOpen={setCreateDialogOpen} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
} 