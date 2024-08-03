
import dynamic from "next/dynamic";
const Coin = dynamic(() => import('@/components/coin/coin'), {ssr: false});

function Page() {

  return (
    <div
      className="
      w-full
      h-auto
      flex
      flex-col
      text-[70px]"
    >
      <Coin/>
    </div>
  );
}

export default Page;