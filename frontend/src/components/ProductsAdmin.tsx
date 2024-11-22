import React, { useState, useEffect } from 'react';
import { Product } from '../utils/types';
import { ProductImagesModal } from './ImageModal';
import { DeactivateProduct } from '../services/DeactivateProduct';

const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [openModals, setOpenModals] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/products/?page=1&limit=10');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data);
        console.log(data);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDeactivate = async (productId: number) => {
    try {
      await DeactivateProduct(productId);
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, is_published: false };
        }
        return product;
      });
      setProducts(updatedProducts);
    } catch (error: Error | any) {
      setError(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 lg:dark:bg-gradient-to-b lg:dark:from-orange-300/30 lg:dark:to-blue-gray-900 w-full h-full overflow-hidden text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
      <table className="w-full text-left table-auto min-w-max pl-7 ml-3">
      <thead>
        <tr>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">ID</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Title</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Description</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Price</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Published</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Created At</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Stock</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Images</th>
          <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Deactivate</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.id}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.title}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.description}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.price}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.is_published ? 'Yes' : 'No'}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{new Date(product.created_at).toLocaleString()}</td>
            <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.stock}</td>
            <td>
              <button className="view-images" onClick={() => setOpenModals({ ...openModals, [product.id]: true })}>
                View Images
              </button>
              <ProductImagesModal
                isOpen={openModals[product.id]}
                onRequestClose={() => setOpenModals({ ...openModals, [product.id]: false })}
                product={product}
              />
            </td>
            <button className="view-images" onClick={() => handleDeactivate(product.id)}>
                Deactivate
            </button>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default ProductsTable;