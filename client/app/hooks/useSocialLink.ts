'use client'
import { useMemo } from "react"
import { RoutesName } from "../utils/constant"
import { MdOutlineAnalytics, RxDashboard, FaFacebookF, FaTwitter, FaInstagram  } from "../utils/icons"
import { usePathname, useRouter } from "next/navigation"


const useSocialLink = () =>{
  const pathname = usePathname();
  const navigate = useRouter()

    const routes = [
        {
            id: 'Facebook',
            navigate: () => navigate.push('#'),
            icon: FaFacebookF,
            label: 'Facebook'
        },
        {
            id: 'Twitter',
            navigate: () => navigate.push("#"),
            icon: FaTwitter,
            label: 'Twitter',
        },
        {
            id: 'Instagram',
            navigate: () => navigate.push("#"),
            icon: FaInstagram,
            label: 'Instagram',
        },

    ]

    return useMemo(()=>(routes),[pathname])

}

export { useSocialLink }