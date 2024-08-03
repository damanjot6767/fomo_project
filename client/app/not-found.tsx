import { TypographyH1, TypographyH2, TypographyH5 } from '@/components/ui/Typography'
import Link from 'next/link'
import { GoArrowRight } from 'react-icons/go'
import { RoutesName } from './utils'
 
export default function NotFound() {
  return (
    <div className='w-full h-screen'>
      <div className="
      w-full
      h-full
      flex
      flex-col
      justify-center
      gap-10">
        <div className="
        w-full
        flex
        items-center
        justify-center
        text-primary">
          <TypographyH1 title="404 NOT"/>
        </div>
        <div className="
        w-full
        flex
        items-center
        justify-center">
          <TypographyH2 title="OOPS!! PAGE NOT FOUND"/>
        </div>
        <div className="
        -mt-5
        flex
        items-center
        justify-center
        ">
          <Link className="
          flex
          items-center
          py-3
          px-6
          gap-3
          rounded-md
          group
          text-white
          transition-all
          duration-200
          bg-primary"
          href={RoutesName.Home}>
            <TypographyH5 className="font-[600]" title="BACK TO HOME PAGE"/>
            <GoArrowRight 
            size={20}
            className="
            transition-all
            duration-300
            rotate-[-45deg]
            group-hover:rotate-0"/>
          </Link>
      </div>
      </div>
    </div>
  )
}