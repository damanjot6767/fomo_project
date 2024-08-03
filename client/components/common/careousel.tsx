'use client'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePathname } from "next/navigation";
import { motion } from "@/app/utils/animation";
import Image from "next/image";
import { TypographyH1, TypographyH4, TypographyH5, TypographyP } from "../ui/Typography";
import { cn } from "@/lib/utils";

interface ImageModal {
    isCover: boolean;
    name: string,
    imageUrl: string,
    type: string,
    size: number
  }

interface ImageDataProps {
    id: number;
    title?: string;
    description?: string;
    image: ImageModal;
  }



const Careousell = (
    {imageData, careousellHeight, imageMode}:
    {imageData: ImageDataProps[] | [], careousellHeight?: string, imageMode?: 'cover' | 'contain' | 'fill'}
) => {

    const pathname = usePathname();

    const settings = {
        infinite: imageData?.length>1,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
        cssEase: 'linear',
    };
    return (
        <div className={`
          w-full
          h-full`}>
            <Slider {...settings}>
                {imageData?.map((item) => (
                    <div className={cn("relative w-full h-[calc(100vh)]", careousellHeight?careousellHeight: null)}
                        key={item.id}>
                        <Image
                        fill
                        src={item.image?.imageUrl}
                        className={cn("h-full object-cover w-full", imageMode?`object-${imageMode}`: null)}
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
                            flex 
                            items-center 
                            justify-center"
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, ease: 'linear' }}>
                                <TypographyH1
                                    className="font-[200] text-center"
                                    title={item?.title || ""} />
                            </motion.div>

                            <motion.div className="
                            flex 
                            items-center 
                            justify-center"
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.4, ease: 'linear', delay: 0.1 }}>
                                <TypographyH4
                                    title={item?.description || ""} className="text-center" />
                            </motion.div>
                        </div>
                    </div>
                ))}
            </Slider>

        </div>
    )
}

export default Careousell