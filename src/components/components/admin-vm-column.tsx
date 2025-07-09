"use client"

import {ColumnDef} from "@tanstack/table-core";
import {ResponsiveDialog} from "@/components/layouts/responsive-dialog";
import {UserRoundPen, UserRoundX} from "lucide-react";
import React from "react";
import {DeleteAdminForm} from "@/components/forms/delete-admin-form";
import {UserVm} from "@/lib/api/models/user/user-vm";
import {EditAdminForm} from "@/components/forms/edit-admin-form";

export const adminVmColumn: ColumnDef<UserVm>[] = [
    {
        accessorKey: "userName",
        header: "Потребителско име",
    },
    {
        id: "actions",
        cell: ({row}) => {
            return (
                <div className="flex justify-end space-x-2">
                    <ResponsiveDialog
                        buttonVariant={"outline"}
                        buttonIcon={<UserRoundPen className={"h-5 w-5"}/>}
                        buttonTitle={"Редактирай профила"}
                        dialogTitle={"Редактирай профила"}
                        dialogDescription={`Направете промени в профила на ${row.original.userName}. Щракнете върху запазване, когато сте готови.`}
                        form={
                            <EditAdminForm
                                username={row.original.userName}
                                userId={row.original.id} />
                        }
                    />
                    <ResponsiveDialog
                        buttonVariant={"destructive"}
                        buttonIcon={<UserRoundX className={"h-5 w-5"}/>}
                        buttonTitle={"Изтрий профила"}
                        dialogTitle={"Напълно ли сте сигурни?"}
                        dialogDescription={`Това действие не може да бъде отменено. Това ще изтрие за постоянно акаунта на ${row.original.userName} и ще премахне всички данни от нашите сървъри.`}
                        form={
                            <DeleteAdminForm
                                adminUsername={row.original.userName}
                                adminId={row.original.id} />
                        }
                    />
                </div>
            );
        },
    }
]