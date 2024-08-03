'use client'
import React from 'react'
import { motion } from "@/app/utils/animation";

const FallbackLoading = () => {
    return (
        <div className='
        fixed
        inset-x-0
        inset-y-0
        flex
        items-center
        justify-center
        bg-white'>
            <motion.div 
            className='flex
            items-center
            gap-2'>
                <motion.div 
                className='w-5 h-5 rounded-full bg-primary'
                animate={{opacity: [0, 1, 0]}}
                transition={{duration: 0.4, ease: 'linear', repeat: Infinity, repeatDelay: 0.5}}/>
                <motion.div 
                className='w-5 h-5 rounded-full bg-primary'
                animate={{opacity: [0, 1, 0]}}
                transition={{duration: 0.4, ease: 'linear', repeat: Infinity, delay: 0.1, repeatDelay: 0.5}}/>
                <motion.div 
                className='w-5 h-5 rounded-full bg-primary'
                animate={{opacity: [0, 1, 0]}}
                transition={{duration: 0.4, ease: 'linear', repeat: Infinity, delay: 0.1, repeatDelay: 0.5}}/>
            </motion.div>
        </div>
    )
}

export default FallbackLoading