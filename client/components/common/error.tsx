'use client'
import React from 'react'
import { TypographyH1, TypographyH2, TypographyH5 } from '../ui/Typography'
import Link from 'next/link'
import { GoArrowRight, RoutesName } from '@/app/utils'
import { useRouter } from 'next/navigation'

const ErrorPage = ({
    error
  }: {
    error: string;
  }) => {
    const router = useRouter()
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
                    <TypographyH1 title={error || "404 NOT"} />
                </div>

                <div className="
                -mt-5
                flex
                items-center
                justify-center
                ">
                    <button className="
                    flex
                    items-center
                    py-3
                    px-6
                    gap-3
                    rounded-md
                    group
                    text-primary
                    transition-all
                    duration-200
                    border-primary
                    border-2"
                    onClick={()=> router.refresh()}>
                        <TypographyH5 className="font-[600]" title="TRY AGAIN" />
                        <GoArrowRight
                        size={20}
                        className="
                        transition-all
                        duration-300
                        rotate-[-45deg]
                        group-hover:rotate-0"/>
                    </button>
                </div>

                <div className="
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
                        <TypographyH5 className="font-[600]" title="BACK TO HOME PAGE" />
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

export default ErrorPage