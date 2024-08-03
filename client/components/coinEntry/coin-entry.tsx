'use client'
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppDispatch, useTypedSelector } from "@/app/store/store";
import { DataTable } from "../tabel/data-table";
import { columns } from "./table-columns/columns";
import { useEffect, useRef } from "react";
import { getCoinEntriesByCode, getCoins } from "@/app/services";
import FallbackLoading from "../common/loading";

const intervalTime = process.env.NEXT_PUBLIC_SERVER_COIN_API_CALL_INTERVAL?+process.env.NEXT_PUBLIC_SERVER_COIN_API_CALL_INTERVAL : 5000;

interface IParams {
    coinId: string;
  }
  

const CoinEntry = ({ params }: { params: IParams }) => {
  const navigate = useRouter();
  const intervalId = useRef<any>(null);

  const { coins,  coinEntries, coinEntriesLoading } = useTypedSelector((state) => (state.Coin))
  const dispatch = useAppDispatch()

  useEffect(() => {
    intervalId.current = setInterval(() => {
      dispatch(getCoinEntriesByCode({...params, navigate}))
    }, intervalTime)

    return () => clearInterval(intervalId.current );
  }, [])

  return (
    <div className="flex-col md:flex p-8 pt-6 space-y-4 ">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Coin Entries Based On Price Diff</h2>
      </div>

      <div className="space-y-4">
        {coinEntriesLoading && !coinEntries?
         <h2 className="text-center text-3xl font-bold tracking-tight text-primary">Loading...</h2>:
        <DataTable data={coinEntries || []} columns={columns} label="coinEntries" />}
      </div>
    </div>
  )
}

export default CoinEntry
