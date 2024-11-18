import React from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

// import GetCarts from '../services/GetCarts';
import { CartChoice } from '../services/CartChoice';

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
}

const ProductTile: React.FC<ProductProps> = ({ id, title, price, description, thumbnail }) => {

    return (
        <Card title={title} className="w-90">
            <CardHeader shadow={false} floated={false} className="h-96">
                <img
                    src={`http://localhost:8000/assets/${thumbnail}`}
                    alt="card-image"
                    className="h-full w-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-medium">
                        {title}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                        ${price}
                    </Typography>
                </div>
                <Typography
                    variant="small"
                    color="gray"
                    className="font-normal opacity-75"
                >
                    {description}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0">
                <Button
                    onClick={() => CartChoice(id, 1)}
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductTile