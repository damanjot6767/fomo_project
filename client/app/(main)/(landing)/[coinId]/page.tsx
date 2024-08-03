import dynamic from "next/dynamic";
const CoinEntry = dynamic(() => import('@/components/coinEntry/coin-entry'), {ssr: false});

interface IParams {
  coinId: string;
}

function Page({ params }: { params: IParams }) {

    return (
      <div
      className="
      w-full
      h-auto
      flex
      flex-col
      text-[70px]"
    >
      <CoinEntry params={params}/>
    </div>
    );
}

export default Page;