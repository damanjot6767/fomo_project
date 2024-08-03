"use client"

import { Table } from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "./data-table-view-options"
import { Button } from "@/components/ui/button"
import { IoMdAdd } from "@/app/utils/icons"
import { RoutesName } from "@/app//utils/constant"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { useRouter } from "next/navigation"


interface DataTableToolbarProps<TData> {
  table: Table<TData>
  label: string
}

export function DataTableToolbar<TData>({
  table,
  label
}: DataTableToolbarProps<TData>) {
  const navigate = useRouter()
  return (
    <div className="flex items-center justify-between">
      <DataTableViewOptions table={table} />
    </div>
  )
}
