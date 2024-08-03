'use client'
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useTypedSelector } from "@/app/store/store";
import { DataTable } from "../tabel/data-table";
import { columns } from "./table-columns/columns";
import { useEffect, useRef } from "react";
import { getCoins } from "@/app/services";

const intervalTime = process.env.NEXT_PUBLIC_SERVER_COIN_API_CALL_INTERVAL?+process.env.NEXT_PUBLIC_SERVER_COIN_API_CALL_INTERVAL : 5000;

const Coin = () => {
  const navigate = useRouter();
  const intervalId = useRef<any>(null);

  const { coinsLoading, coins } = useTypedSelector((state) => (state.Coin))
  const dispatch = useAppDispatch()

  useEffect(() => {
    intervalId.current = setInterval(() => {
      dispatch(getCoins())
    }, intervalTime)

    return () => clearInterval(intervalId.current );
  }, [])

  return (
    <div className="flex-col md:flex p-8 pt-6 space-y-4 ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Coins</h2>
      </div>

      <div className="space-y-4">
        <DataTable data={coins || []} columns={columns} label="coins" />
      </div>
    </div>
  )
}

export default Coin
