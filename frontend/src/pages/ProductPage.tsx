import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Typography, Button, Card, CardHeader, CardBody, CardFooter } from '@material-tailwind/react';
import CarouselCustomNavigation from '../components/Carousel';
import { MyProduct } from '../services/GetProduct';
import { CartChoice } from '../services/CartChoice';

// interface SingleProductProps {
//         product_id: number;
// }

const SingleProduct = () => {
    // const { params } = useParams();
    
    
    const location = useLocation();
    const product_id = location.state?.product_id;
    // console.log('location');
    // console.log(location);
    // console.log(product_id);
    // const product_id = location.state?.product_id;
    const [productData, setProductData] = useState<any>({});

    useEffect(() => {
        const fetchCart = async () => {
            const response = await MyProduct(Number(product_id));
            console.log(response.data);
            console.log(response);
            setProductData(response);
            // setCartItems(response.carts[0].cart_items);
            // setCartTotalAmount(response.carts[0].total_amount);
        };
        fetchCart();
    }, [product_id]);

    // const productData = 

    return (
        <div className="container mx-auto p-4 pt-6 mt-6">
            <div className="flex flex-wrap -mx-4">
                <div className="w-full xl:w-8/12 p-4">
                    <CarouselCustomNavigation />
                </div>
                <div className="w-full xl:w-4/12 p-4">
                    <Card className="h-full py-8" color='blue'>
                        <CardHeader color="gray">
                            <Typography variant="h3" color="white" style={{ marginLeft: '10px' }}>
                                {productData.title}
                            </Typography>
                        </CardHeader>
                        <CardBody>
                            <Typography color="gray">
                                {productData.description}
                            </Typography>
                            <Typography variant="h4" color="gray" className="mt-4">
                                ${productData.price}
                            </Typography>
                        </CardBody>
                        <CardFooter>
                            <Button color="gray" size="lg" onClick={() => CartChoice(product_id, 1)}>
                                Add to Cart
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;