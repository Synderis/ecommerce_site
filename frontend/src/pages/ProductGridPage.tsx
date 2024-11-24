import React, { useState, useEffect } from 'react';
import ProductTile from '../components/ProductTile';
import { Product } from '../utils/types';
// import FooterBar from "../components/Footer";


const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8000/products/?page=1&limit=10');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setProducts(data.data); // Note the change here
                setLoading(false);
            } catch (err) {
                setError((err as Error)?.message || 'An unknown error occurred');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log('Products state:', products); // Log the products state
    }, [products]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <section className="pr-5 pl-9 py-10 lg:pl-8 lg:pr-8 lg:py-20 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800">
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-3 lg:gap-16 max-w-7xl mx-auto">
                {products.map(product => {
                    return <ProductTile
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        description={product.description}
                        thumbnail={product.thumbnail}
                    />
                })}
            </div>
            
        </section>
    );
};

export default ProductPage;