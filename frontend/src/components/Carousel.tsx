import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import * as React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { IconButton } from "@material-tailwind/react";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

function CustomNavigation() {
    const swiper = useSwiper();

    return (
        <>
            <IconButton
                size="lg"
                variant="outlined"
                color="white"
                onClick={() => swiper.slidePrev()}
                className="dark !absolute left-2 top-1/2 z-10 -translate-y-1/2"
            >
                <NavArrowLeft className="h-7 w-7 -translate-x-0.5 stroke-2" />
            </IconButton>

            <IconButton
                size="lg"
                variant="outlined"
                color="white"
                onClick={() => swiper.slideNext()}
                className="dark !absolute right-2 top-1/2 z-10 -translate-y-1/2"
            >
                <NavArrowRight className="h-7 w-7 translate-x-px stroke-2" />
            </IconButton>
        </>
    );
}

function customPagination(_: any, className: string) {
    return `<span class="${className} w-4 h-4 [&.swiper-pagination-bullet-active]:bg-white [&.swiper-pagination-bullet-inactive]:opacity-50 background:rgb(var(--color-background))"></span>`;
}

interface CarouselProps {
    images: string[];
}

const CarouselCustomNavigation = ({ images }: CarouselProps) => {
    return (
        <Swiper
            pagination={{
                enabled: true,
                clickable: true,
                dynamicBullets: true,
                renderBullet: customPagination,
            }}
            modules={[Navigation, Pagination]}
            className="relative rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background"
        >
            {images && images.length > 0 ? (
                images.map((img, index) => (
                    <SwiperSlide key={index} className="select-none">
                        <img
                            src={img}
                            alt={`image-${index}`}
                            className="h-[45rem] w-full object-cover"
                        />
                    </SwiperSlide>
                ))
            ) : (
                <div className="h-[45rem] w-full bg-gray-300" />
            )}
            <CustomNavigation />
        </Swiper>
    );
};

export default CarouselCustomNavigation;