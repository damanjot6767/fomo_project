'use client'
import React from 'react';
import { cn } from '@/lib/utils';
import { useScroll } from '@/app/hooks'
import { motion , GoArrowRight} from "@/app/utils"

export const ScrollToTop = () => {
    const {scrolled, handleScrollToTop} = useScroll();


    return (
        <div className={cn("fixed bottom-[30px] right-[0px] z-20", scrolled && "block")}>
            <motion.div className='
            flex
            items-center
            justify-center
            p-2
            bg-primary'
            onClick={handleScrollToTop}
            onTap={handleScrollToTop}
            initial={{x: 40}}
            animate={{x:scrolled?0:40}}
            exit={{x: !scrolled?0:40}}
            transition={{duration:0.4}}>
                <GoArrowRight size={20} className='text-white rotate-[270deg]'/>
            </motion.div>
        </div>
    )
}

