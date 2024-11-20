import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import CarouselCustomNavigation from '../components/Carousel';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <section className="dark:bg-gradient-to-b mb-2 h-screenHeight dark:from-orange-800/10 dark:to-gray-800">
        <div className="container mx-auto py-12 lg:pb-24 lg:py-20 grid grid-cols-1 gap-8 lg:grid-cols-2 items-center justify-center" style={{ paddingBottom: '242px' }}>
            {/* Welcome Section */}
            <div className="flex flex-col items-center text-center ml-5 mr-5 lg:w-full">
                <Typography variant="h1" className="mb-4">
                    Welcome to our website
                </Typography>
                <Typography variant="lead" className="opacity-70 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
                </Typography>
                <Link to={"/products"}>
                    <Button className="bg-orange-300 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100">See All Products</Button>
                </Link>
            </div>

            {/* Carousel Section */}
            <div className="flex justify-center mr-2 ml-5 lg:w-full lg:mr-0 lg:ml-0">
                <CarouselCustomNavigation />
            </div>

            {/* <div className="flex flex-col items-center text-center mt-0 lg:w-full">
                <Typography variant="h2" className="mb-4">Our Features</Typography>
                <div className="grid gap-8 lg:w-full">
                    <div className="flex flex-col items-center text-center">
                        <Typography variant="h5" className="mb-2">Feature 1</Typography>
                        <Typography className="opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Typography variant="h5" className="mb-2">Feature 2</Typography>
                        <Typography className="opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Typography variant="h5" className="mb-2">Feature 3</Typography>
                        <Typography className="opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </div>
                </div>
            </div> */}
        </div>
        </section>
    );
};

export default HomePage;
