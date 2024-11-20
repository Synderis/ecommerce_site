import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import CarouselCustomNavigation from '../components/Carousel';
import { MyProduct } from '../services/GetProduct';
import { CartChoice } from '../services/CartChoice';


const SingleProduct = () => {
    const location = useLocation();
    const product_id = location.state?.product_id;
    const [productData, setProductData] = useState<any>({});

    useEffect(() => {
        const fetchCart = async () => {
            const response = await MyProduct(Number(product_id));
            console.log(response.data);
            console.log(response);
            setProductData(response);
        };
        fetchCart();
    }, [product_id]);

    return (
        <section className="dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800 ">
        <div className="container mx-auto p-4 pt-6 mt-6">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full xl:w-8/12 p-4">
                    <CarouselCustomNavigation />
                </div>
                <div className="w-full xl:w-4/12 p-4">
                    <Card className="h-full py-8 dark:bg-gray-900 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900">
                        <CardHeader color="gray">
                            <Typography variant="h3" color="white" className='ml-2 dark:text-gray-300'>
                                {productData.title}
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography color="gray" className="font-normal opacity-75 dark:text-white">
                                {productData.description}
                            </Typography>
                            <Typography variant="h4" color="gray" className="mt-4 opacity-75 dark:text-white">
                                ${productData.price}
                            </Typography>
                        </CardBody>
                        <CardFooter>
                            <Button color="gray" className='bg-gray-900 text-blue-gray-900 dark:text-gray-300 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100' size="lg" onClick={() => CartChoice(product_id, 1)}>
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </section>
    );
};

export default SingleProduct;