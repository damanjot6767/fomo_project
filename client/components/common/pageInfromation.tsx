'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePathname } from "next/navigation";
import { motion } from "@/app/utils/animation";

import Image from "next/image";
import { TypographyH1, TypographyH4, TypographyH5, TypographyP } from "../ui/Typography";


 const PageInfromation = ({title,description,imageUrl}:{title?: string, description?: string, imageUrl: any}) => {


    return (
        <div className="w-full h-full">
            <motion.div 
            className="relative w-full h-[calc(100vh)]"
            initial={{x: '100%'}}
            whileInView={{x: '0%'}}
            transition={{duration: 0.8, ease: 'linear'}}
            viewport={{once: true}}>
                <Image
                fill
                src={imageUrl}
                className=" h-full object-cover w-full"
                alt=""
                />
                <div className="
                absolute 
                top-1/2 
                left-1/2 
                transform 
                -translate-x-1/2 
                -translate-y-1/2 
                p-4
                flex
                flex-col
                items-center
                gap-2
                text-background">
                    <motion.div className="
                    w-full
                    flex 
                    items-center 
                    justify-center"
                    initial={{y: 40, opacity: 0}}
                    whileInView={{y:0, opacity: 1}}
                    transition={{duration: 0.4, delay: 0.8, ease:'linear'}}>
                        <TypographyH1
                            className="font-[200] text-center"
                            title={title || ""} />
                    </motion.div>

                    <motion.div className="
                    flex 
                    items-center 
                    justify-center"
                    initial={{y: 40, opacity: 0}}
                    whileInView={{y:0, opacity: 1}}
                    transition={{duration: 0.4, ease:'linear', delay: 0.9}}>
                        <TypographyH4
                            title={description || ""} className="text-center"/>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default PageInfromation