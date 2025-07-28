"use client"

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Check, X, RotateCcw } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RequestVm } from "@/lib/api/models/request/request-vm";
import requestService from "@/lib/services/request-service";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateRequestForm } from "@/components/forms/create-request-form";
import { EditRequestForm } from "@/components/forms/edit-request-form";
import { DeleteRequestForm } from "@/components/forms/delete-request-form";
import { toast } from "sonner";

interface RequestsTableProps {
    title: string;
}

export function RequestsTable({ title }: RequestsTableProps) {
    const [requests, setRequests] = useState<RequestVm[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState<RequestVm | null>(null);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const data = await requestService.GetAllRequestsAsync();
            // Ensure we always have a valid array
            setRequests(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Failed to fetch requests");
            // Set empty array on error to prevent table crashes
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleApprove = async (request: RequestVm) => {
        try {
            await requestService.ApproveRequestAsync(request.id);
            toast.success("Request approved successfully");
            fetchRequests();
        } catch (error) {
            console.error("Error approving request:", error);
            toast.error("Failed to approve request");
        }
    };

    const handleReject = async (request: RequestVm) => {
        try {
            await requestService.RejectRequestAsync(request.id);
            toast.success("Request rejected successfully");
            fetchRequests();
        } catch (error) {
            console.error("Error rejecting request:", error);
            toast.error("Failed to reject request");
        }
    };

    const handleReturn = async (request: RequestVm) => {
        try {
            await requestService.ReturnRequestAsync(request.id);
            toast.success("Request marked as returned successfully");
            fetchRequests();
        } catch (error) {
            console.error("Error marking request as returned:", error);
            toast.error("Failed to mark request as returned");
        }
    };

    const getStatusBadge = (status: string) => {
        const statusColors = {
            "Pending": "bg-yellow-100 text-yellow-800",
            "Approved": "bg-green-100 text-green-800",
            "Rejected": "bg-red-100 text-red-800",
            "Returned": "bg-blue-100 text-blue-800",
        };

        return (
            <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
                {status}
            </Badge>
        );
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
            cell: ({ row }) => {
                const description = row.getValue("description") as string;
                return (
                    <div className="max-w-xs truncate" title={description}>
                        {description}
                    </div>
                );
            },
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
            cell: ({ row }) => {
                const request = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedRequest(request);
                                    setIsEditDialogOpen(true);
                                }}
                            >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {request.status === "Pending" && (
                                <>
                                    <DropdownMenuItem
                                        onClick={() => handleApprove(request)}
                                        className="text-green-600"
                                    >
                                        <Check className="mr-2 h-4 w-4" />
                                        Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => handleReject(request)}
                                        className="text-red-600"
                                    >
                                        <X className="mr-2 h-4 w-4" />
                                        Reject
                                    </DropdownMenuItem>
                                </>
                            )}
                            {request.status === "Approved" && (
                                <DropdownMenuItem
                                    onClick={() => handleReturn(request)}
                                    className="text-blue-600"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Mark as Returned
                                </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedRequest(request);
                                    setIsDeleteDialogOpen(true);
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
        return <div className="p-4">Loading requests...</div>;
    }

    // Safety check to ensure requests is always a valid array before rendering DataTable
    if (!Array.isArray(requests)) {
        console.warn("Requests data is not an array:", requests);
        return <div className="p-4">Loading requests data...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{title}</h2>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                    Create Request
                </Button>
            </div>

            <DataTable columns={columns} originalData={requests} />

            {/* Create Request Dialog */}
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Request</DialogTitle>
                        <DialogDescription>
                            Fill in the details to create a new request.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateRequestForm
                        onSuccess={() => {
                            setIsCreateDialogOpen(false);
                            fetchRequests();
                        }}
                        onCancel={() => setIsCreateDialogOpen(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Edit Request Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Request</DialogTitle>
                        <DialogDescription>
                            Update the request details.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRequest && (
                        <EditRequestForm
                            request={selectedRequest}
                            onSuccess={() => {
                                setIsEditDialogOpen(false);
                                fetchRequests();
                            }}
                            onCancel={() => setIsEditDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Request Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Request</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this request? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRequest && (
                        <DeleteRequestForm
                            request={selectedRequest}
                            onSuccess={() => {
                                setIsDeleteDialogOpen(false);
                                fetchRequests();
                            }}
                            onCancel={() => setIsDeleteDialogOpen(false)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
