"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/app/store/store"
import { useRouter } from "next/navigation"
import { CoinActions } from "@/app/reducers"
import { RoutesName } from "@/app/utils"



interface DataTableRowActionsProps <TData>{
  row: Row<TData>
  label: string
}

export function DataTableRowActions<TData>({
  row,
  label
}: DataTableRowActionsProps<TData>) {

  const navigate = useRouter();
  const dispatch = useAppDispatch();

  const handleCoinEntry = ()=>{
    switch (label) {
      case 'coins':
        dispatch(CoinActions.setCoinDetails(row?.original))
        //@ts-ignore
       
        navigate.push(RoutesName.Coin+"/"+row.original.code)
        break;

      default:
        return
    }
  }

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-primary flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      {label==="coins"?
      <DropdownMenuContent  align="end" className="w-[160px]">
      <DropdownMenuItem onClick={handleCoinEntry}>Coin Entry</DropdownMenuItem>
      {/* <DropdownMenuItem>Make a copy</DropdownMenuItem> */}
    </DropdownMenuContent>:null}

    </DropdownMenu>
  )
}
