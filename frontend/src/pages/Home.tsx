import React from 'react';
import { Typography, Button } from '@material-tailwind/react';
import CarouselCustomNavigation from '../components/Carousel';

const HomePage = () => {
    return (
        <div className="container mx-auto py-12 grid h-screen items-center justify-center">
            {/* Welcome Section */}
            <div className="flex flex-col items-center text-center lg:w-full">
                <Typography variant="h1" className="mb-4">
                    Welcome to our website
                </Typography>
                <Typography variant="lead" className="opacity-70 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
                </Typography>
                <Button className="mb-8">See All Products</Button>
            </div>

            {/* Carousel Section */}
            <div className="flex justify-center lg:w-full">
                <CarouselCustomNavigation />
            </div>

            {/* Features Section */}
            <div className="flex flex-col items-center text-center mt-0 lg:w-full">
                <Typography variant="h2" className="mb-4">Our Features</Typography>
                <div className="grid gap-8 lg:w-full">
                    {/* Feature 1 */}
                    <div className="flex flex-col items-center text-center">
                        <Typography variant="h5" className="mb-2">Feature 1</Typography>
                        <Typography className="opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </div>
                    {/* Feature 2 */}
                    <div className="flex flex-col items-center text-center">
                        <Typography variant="h5" className="mb-2">Feature 2</Typography>
                        <Typography className="opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </div>
                    {/* Feature 3 */}
                    <div className="flex flex-col items-center text-center">
                        <Typography variant="h5" className="mb-2">Feature 3</Typography>
                        <Typography className="opacity-70">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
