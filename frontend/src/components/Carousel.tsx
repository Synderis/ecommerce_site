import { Carousel } from "@material-tailwind/react";

interface CarouselProps {
    images: string[];
}

interface NavigationProps {
    setActiveIndex: (index: number) => void;
    activeIndex: number;
    length: number;
}

const CarouselCustomNavigation = ({ images }: CarouselProps) => {
    console.log('images:', images);
    return (
        <Carousel
            className="rounded-xl"
            navigation={({ setActiveIndex, activeIndex, length }: NavigationProps) => (
                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                    {new Array(length).fill("").map((_, i) => (
                        <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                }`}
                            onClick={() => setActiveIndex(i)}
                        />
                    ))}
                </div>
            )}
        >
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt=""
                    className="h-full w-full object-cover"
                />
            ))}
        </Carousel>
    );
};

export default CarouselCustomNavigation;