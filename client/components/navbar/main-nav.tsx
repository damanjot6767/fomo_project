"use client"
import { useNavbarRoutes } from "@/app/hooks/useNavbarRoutes"
import { cn } from "../../lib/utils"
import { RoutesName } from "@/app/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {

  const navbarRoutes = useNavbarRoutes()
  return (
    <nav
      className={cn("w-full flex items-center justify-between", className)}
      {...props}
    >
      {navbarRoutes?.map((item) => (
        <button
          key={item.id}
          className={cn("text-sm font-medium transition-colors text-primary hover:text-muted-foreground", item.active && "text-muted-foreground",item.label!=="Coin"&&"opacity-40")}
          onClick={item.navigate}
          disabled={item.label==="Coin"?false:true}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}