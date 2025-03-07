"use client"

import type { TaskSearchResultsType } from "@/lib/queries/getTaskSearchResults"

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"

import { CircleCheckIcon, CirclePauseIcon, CircleXIcon } from "lucide-react"

import { useRouter } from "next/navigation"

type Props = {
    data: TaskSearchResultsType,
}

export default function TaskTable({data}: Props){
    const router = useRouter()

    type RowType = TaskSearchResultsType[0]

    const columnHeadersArray : Array<keyof RowType> = [
        "taskDate",
        "title",
        "studentId",
        "teacherId",
        "tech",
        "status"
    ]

    const columnHelper = createColumnHelper<RowType>()

    const columns = columnHeadersArray.map((columnName) => {
        return columnHelper.accessor((row) => { //transformational
            const value = row[columnName]
            if(columnName === "taskDate" && value instanceof Date){
                return value.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }).replace(/\//g, "-")
            }
            return value
        }, {
            id: columnName,
            header: columnName[0].toUpperCase() + columnName.slice(1),
            cell: ({ getValue }) => { //presentational
                const value = getValue()
                if(columnName === "status") {
                    return (
                        <div className="grid place-content-center ">
                            {value === "NS" ? ( <CircleXIcon className="opacity-25" /> )
                                : value === "IP" ? ( <CirclePauseIcon className="text-yellow-500" /> ) : ( <CircleCheckIcon className="text-green-600" /> )}
                        </div>
                    )
                }
                return value
            }
        })
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return(
        <div className="mt-6 rounded-lg overflow-hidden border border-border">
            <Table className="border">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="bg-secondary">
                                        <div>
                                            {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )
                                            }
                                        </div>
                                    </TableHead>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            className="cursor-pointer hover:bg-border/25 dark:hover:bg-ring/40"
                            onClick={() => router.push(`/tasks/form?taskId=${row.original.id}`)}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="border">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
