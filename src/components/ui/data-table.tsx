"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel, getSortedRowModel, RowSelectionState, SortingState,
    TableState,
    Updater,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import React from "react";
import {DataTablePagination} from "@/components/ui/data-table-pagination";
import clientHttpClient from "@/lib/services/client-http";
import {undefined} from "zod";
import {fuzzyFilter} from "@/components/ui/data-table-sorting";
import DebounceInput from "@/components/ui/debounce-input";
import {SessionStorageService} from "@/lib/services/session-storage-service";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    originalData: TData[]
    refetchUrl?: string | undefined,
    searchText?: string | undefined,
    createElement?: React.ReactElement | undefined,
    providerId?: string | undefined,
    allowOnlySingleRowSelection?: boolean | undefined
    selectionRowKey?: string | undefined
    tableRefreshEventKey?: string | undefined
    defaultSorting?: SortingState | undefined
}

export function DataTable<TData, TValue>({
                                             columns,
                                             originalData,
                                             refetchUrl,
                                             searchText,
                                             createElement,
                                             providerId,
                                             allowOnlySingleRowSelection,
                                             selectionRowKey,
                                             tableRefreshEventKey,
                                             defaultSorting
                                         }: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [data, setData] = React.useState(() => originalData)
    const [isLoaded, setIsLoaded] = React.useState(true)
    const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
    const [sorting, setSorting] = React.useState<SortingState>(defaultSorting ?? [])
    
    React.useEffect(() => {
        if (tableRefreshEventKey) {
            window.addEventListener(tableRefreshEventKey, refetchData)
        }

        if (selectionRowKey) {
            const selectedRowState = SessionStorageService.getItem<RowSelectionState>(selectionRowKey);
            if (selectedRowState) {
                setRowSelection(selectedRowState);
            }
        }
        
        return () => {
            if (tableRefreshEventKey) {
                window.removeEventListener(tableRefreshEventKey, refetchData)
            }
        }
    }, [])
    
    React.useEffect(() => {
        onRowSelectionChange(rowSelection);
    }, [rowSelection])
    
    const refetchData = async () => {
        if (refetchUrl)
        {
            if (data.length === 0) {
                setIsLoaded(false);
            }
            const res = await clientHttpClient.get(refetchUrl);
            const newData = res.data as TData[];
            
            setData(newData);
            setIsLoaded(true);
        }
    }

    const onRowSelectionChange = (rowSelection: RowSelectionState) => {
        if (!selectionRowKey) {
            return;
        }
        
        if (Object.keys(rowSelection).length === 0) {
            SessionStorageService.removeItem(selectionRowKey);
            return;
        }

        SessionStorageService.setItem(selectionRowKey, rowSelection);
    }
    
    const table = useReactTable({
        onStateChange(updater: Updater<TableState>): void {
        }, renderFallbackValue: undefined,
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        getRowId: (row) => (row as any).id,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "fuzzy",
        enableMultiRowSelection: !allowOnlySingleRowSelection,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        meta: {
          providerId: providerId  
        },
        state: {
            sorting,
            globalFilter,
            rowSelection,
        },
        initialState: {
            columnVisibility: columns.reduce((acc, column) => {
                acc[column.id!] = !column.meta?.hidden;
                return acc;
            }, {} as Record<string, boolean>),
            
        }
    })

    return (
        <div className="space-y-4">
            <div className="ml-auto flex items-center gap-2 justify-between">
                {searchText && (
                    <DebounceInput
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        className="max-w-sm"
                        placeholder={searchText}
                    />
                )}
                {createElement && (
                    <createElement.type {...createElement.props} />
                )}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    {isLoaded ? "No results." : "Loading..."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between">
                <div className="flex items-center justify-between px-2">
                    <p className="text-sm font-medium">Total count: {data.length}</p>
                </div>
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
