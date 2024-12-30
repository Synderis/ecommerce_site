import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Button, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import CarouselCustomNavigation from '../components/Carousel';
import { ProductPageSkeleton, ProductCarouselSkeleton } from '../components/PageSkeletons';
import { MyProduct } from '../services/GetProduct';
import { s3_bucket_url } from "../utils/utils";


const SingleProduct = () => {
    const location = useLocation();
    const product_id = location.state?.product_id;
    const [loading, setLoading] = useState(true);
    const [productData, setProductData] = useState<any>({});

    useEffect(() => {
        const fetchCart = async () => {
            const response = await MyProduct(Number(product_id));
            console.log(response.data);
            console.log(response);
            setProductData(response);
            setLoading(false);
        };
        fetchCart();
    }, [product_id]);

    
    return (
        <section className="dark:bg-gradient-to-b px-2 lg:pl-0 dark:from-orange-800/10 dark:to-gray-800 ">
            <div className="container mx-auto p-4 pt-3">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full xl:w-8/12 p-4">
                        {!loading && productData && productData.images && productData.images.length > 0 ? (
                                <CarouselCustomNavigation images={productData.images.map((image: string) => `${s3_bucket_url}/${image}`)} />
                            ) : (
                                    <ProductCarouselSkeleton />
                            )}
                    </div>
                    {loading ? <ProductPageSkeleton /> : (
                    <div className="w-full xl:w-4/12 p-4">
                        <Card className="h-full py-8 dark:bg-gray-900 border dark:border-orange-300 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900">
                            <CardHeader color="gray" className="py-1 mt-1 align-left rounded-md bg-gray-800 border border-orange-300 text-sm text-white transition-all shadow-lg focus:bg-slate-700 active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-gray-800 dark:text-white">
                                <Typography variant="h3" color="white" className='ml-2 dark:text-gray-300'>
                                    {productData.title}
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                <Typography color="gray" className="font-normal opacity-80 dark:text-white">
                                    {productData.description}
                                </Typography>
                                <Typography variant="h4" color="gray" className="mt-4 opacity-75 dark:text-white">
                                    ${(productData.price / 100).toFixed(2)}
                                </Typography>
                            </CardBody>
                            <CardFooter>
                                <Button color="gray" className="mt-6 mt-4 rounded-md bg-gray-800 hover:scale-105 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-orange-800/30 dark:text-white">
                                    Add to Cart
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SingleProduct;