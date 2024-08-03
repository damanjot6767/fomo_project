"use client"

import { ColumnDef } from "@tanstack/react-table"

// import { priorities, statuses } from "./data"
import { DataTableColumnHeader } from "@/components/tabel/data-table-column-header"
import { DataTableRowActions } from "@/components/tabel/data-table-row-actions"
import { CoinModal } from "@/app/utils/modals";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { RoutesName } from "@/app/utils";
import { CoinActions } from "@/app/reducers";
import { useAppDispatch } from "@/app/store/store";

const priceFontColor = (price: number)=>{
  if(price<0){
    return "text-red-600"
  }
  else if(price>0){
    return "text-green-600"
  }
  else{
    "text-white"
  }
}

const formatNumberToUSD = (num: number)=> {
  if (num >= 1e12) {
    return `$ ${(num / 1e12).toFixed(2)} T`;
  } else if (num >= 1e9) {
    return `$ ${(num / 1e9).toFixed(2)} B`;
  } else if (num >= 1e6) {
    return `$ ${(num / 1e6).toFixed(2)} M`;
  } else if (num >= 1e3) {
    return `$ ${(num / 1e3).toFixed(2)} K`;
  }
  return `$ ${num.toFixed(2)}`;
}

const calculateVolumeInUSD = (volume: number, price: number) => {
  const volumeInUSD = volume * price;
  return formatNumberToUSD(volumeInUSD);
}

export const columns: ColumnDef<CoinModal>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-auto ml-2 text-xs font-[100] text-muted-foreground hover:text-primary">{row.original?._id}</div>
  },
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coin" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex ml-2">
         
          <span className="max-w-[150px] truncate text-xs font-[100] text-muted-foreground hover:text-primary ">
            {row.original?.code}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex ml-2">
         
          <span className="max-w-[150px] truncate text-xs font-[100] text-muted-foreground hover:text-primary">
            {`$${row.original?.rate?.toFixed(2)}`}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "volume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volume 24h" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex ml-2">
           <span className="max-w-[150px] truncate text-xs font-[100] text-muted-foreground hover:text-primary">
            {calculateVolumeInUSD(row.original.volume, row.original.rate)}
          </span>
      </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "allTimeHighUSD",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="All-Time-High-USD" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex ml-2">
          <span className="max-w-[150px] truncate text-xs font-[100] text-muted-foreground hover:text-primary">
            {`$${row.original.allTimeHighUSD?.toFixed(2)}`}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "hour",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="1h" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex ml-2">
          <div 
           className={cn("max-w-[150px] max-h-[30px] truncate text-xs font-[100] text-muted-foreground hover:text-primary",priceFontColor(row?.original.percentageChangeInPrice.day))} >
            {`${row?.original.percentageChangeInPrice.hour?.toFixed(2)}%`}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "24h",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex ml-2">
          <div 
           className={cn("max-w-[150px] max-h-[30px] truncate text-xs font-[100] text-muted-foreground hover:text-primary",priceFontColor(row?.original.percentageChangeInPrice.day))} >
            {`${row?.original.percentageChangeInPrice.day?.toFixed(2)}%`}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: "coinEntry",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coin Entries" />
    ),
    cell: ({ row }) => {
      const navigate = useRouter();
      const dispatch = useAppDispatch();

      const handleCoinEntry = () => {
        dispatch(CoinActions.setCoinDetails(row?.original))
        navigate.push(RoutesName.Coin+row.original.code)
      }

      return (
        <div className="flex ml-2" onClick={handleCoinEntry}>
          <div 
           className={cn("max-w-[150px] max-h-[30px] truncate text-xs font-[100] text-muted-foreground hover:text-primary underline")} >
            {`Check Entries`}
          </div>
        </div>
      )
    },
    enableSorting: false,
  },
]
