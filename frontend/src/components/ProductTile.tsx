import React from 'react';
import { Link} from 'react-router-dom';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

import { CartChoice } from '../services/CartServices';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
}

const ProductTile: React.FC<ProductProps> = ({ id, title, price, description, thumbnail }) => {
    return (
        <div>
        {/* <div className="dark:bg-gray-900"> */}
            <Card title={title} className="w-90 dark:bg-gray-900 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-blue-gray-900" >
                <Link to={`/products/${id}`} state={{ product_id: id }}>
                    <CardHeader shadow={false} floated={false} className="h-96 dark:bg-gray-900">
                        <img
                            src={`http://localhost:8000/assets/${thumbnail}`}
                            alt="card-image"
                            className="h-full w-full object-cover dark:brightness-50"
                        />
                    </CardHeader>
                    <CardBody>
                        <div className="mb-2 flex items-center justify-between">
                            <Typography color="blue-gray" className="font-medium dark:text-orange-300">
                                {title}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium dark:text-orange-300">
                                ${price}
                            </Typography>
                        </div>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75 dark:text-white"
                        >
                            {description}
                        </Typography>
                    </CardBody>
                </Link>
                <CardFooter className="pt-0">
                    <Button
                        onClick={() => CartChoice(id, 1)}
                        ripple={false}
                        fullWidth={true}
                        className="bg-orange-300 dark:bg-orange-800/10 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                    >
                        Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductTile