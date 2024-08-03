'use client'
import { TypographyH1, TypographyH2, TypographyH3, TypographyH4, TypographyH5, TypographyP } from "../ui/Typography";
import { GoArrowRight, RoutesName, Tilt, motion } from "@/app/utils"
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTypedSelector } from "@/app/store/store";

const aboutData = [
  {
    title: 'GUEST HOSTED',
    value: 97637
  },
  {
    title: 'NO OF PROPERTIES',
    value: 4
  },
  {
    title: 'STAFF',
    value: 20
  },
  {
    title: 'DESTINATIONS',
    value: 3
  }
]

const Home = () => {
  const navigate = useRouter();

  const { coinsLoading, coins} = useTypedSelector((state)=>(state.Coin))

  console.log("32", coinsLoading, coins)

  return (
    <div 
    className="
    h-full
    w-full
    flex
    flex-col
    md:gap-20
    gap-10">

      Home page

    </div>
  )
}

export { Home }
