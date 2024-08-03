import { RoutesName } from "../utils/constant"
import { MdOutlineAnalytics, RxDashboard } from "../utils/icons"
import { usePathname, useRouter } from "next/navigation"

const useNavbarRoutes = () =>{
    const pathname = usePathname();
    const navigate = useRouter()

    const routes = [
        {
            id: '1',
            navigate: () => navigate.push(RoutesName.Coin),
            icon: RxDashboard,
            active: RoutesName.Coin===pathname,
            label: 'Coin'
            
        },
        {
            id: '2',
            navigate: () => navigate.push(RoutesName.Portfolio),
            icon: RxDashboard,
            active: RoutesName.Portfolio===pathname,
            label: 'Portfolio'
            
        },
        {
            id: '3',
            navigate: () => navigate.push(RoutesName.Overview),
            icon: MdOutlineAnalytics,
            active: RoutesName.Overview===pathname,
            label: 'Overview'
        },
        {
            id: '4',
            navigate: () => navigate.push(RoutesName.Trending),
            icon: RxDashboard,
            active: RoutesName.Trending===pathname,
            label: 'Trending'
        },
        {
            id: '5',
            navigate: () => navigate.push(RoutesName.Vote),
            icon: MdOutlineAnalytics,
            active: RoutesName.Vote===pathname,
            label: 'Vote'
        },
        {
            id: '6',
            navigate: () => navigate.push(RoutesName.Exchanges),
            icon: MdOutlineAnalytics,
            active: RoutesName.Exchanges===pathname,
            label: 'Exchanges'
        },
        {
            id: '7',
            navigate: () => navigate.push(RoutesName.Widgets),
            icon: MdOutlineAnalytics,
            active: RoutesName.Widgets===pathname,
            label: 'Widgets'
        },
        {
            id: '8',
            navigate: () => navigate.push(RoutesName.Api),
            icon: MdOutlineAnalytics,
            active: RoutesName.Api===pathname,
            label: 'Api'
        },
    ]

    return routes

}

export { useNavbarRoutes }