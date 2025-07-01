import React, { useState, useEffect } from 'react';
import { Product } from '../utils/types';
import { ProductImagesModal } from './ImageModal';
import { ToggleActiveProduct, AllProducts } from '../services/AdminServices';
import { ProductEditModal } from './ProductEditModal';



const ProductsTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [publishedFilter, setPublishedFilter] = useState(false);
  const [inStockFilter, setInStockFilter] = useState(false);
  const [openModals, setOpenModals] = useState<{ [key: number]: boolean }>({});
  const [openProductModals, setOpenProductModals] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await AllProducts();
        setProducts(response);
        console.log(response);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleActiveToggle = async (productId: number) => {
    try {
      await ToggleActiveProduct(productId);
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, is_published: !product.is_published };
        }
        return product;
      });
      setProducts(updatedProducts);
    } catch (error: Error | any) {
      setError(error);
    }
  };

  const handleProductChange = async ( product: Product ) => {
    const updatedProduct = await AllProducts();
    setOpenProductModals({ ...openProductModals, [product.id]: false })
    setProducts(updatedProduct);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredProducts = products.filter((product) => {
    if (publishedFilter && !product.is_published) return false;
    if (inStockFilter && product.stock === 0) return false;
    return true;
  });

  return (
    <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 w-full h-full lg:overflow-hidden overflow-x-auto text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
      <div className="flex justify-start mb-4">
      <button
        className={`px-4 py-2 ${publishedFilter ? 'bg-blue-500 dark:bg-orange-800/30 text-white hover:scale-105' : 'bg-gray-200 dark:bg-gray-800 hover:scale-105'} mr-2 rounded-md`}
        onClick={() => setPublishedFilter(!publishedFilter)}
      >
        {publishedFilter ? 'Show published' : 'Hide unpublished'}
      </button>
      <button
        className={`px-4 py-2 ${inStockFilter ? 'bg-blue-500 dark:bg-orange-800/30 text-white hover:scale-105' : 'bg-gray-200 dark:bg-gray-800 hover:scale-105'} mr-2 rounded-md`}
        onClick={() => setInStockFilter(!inStockFilter)}
      >
        {inStockFilter ? 'Show 0 stock' : 'Hide 0 stock'}
      </button>
    </div>
      <table className="w-full text-center table-auto min-w-max pl-7 ml-3">
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
            <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Edit</th>
            <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.id}</td>
              <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.title}</td>
              <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white" title={product.description || ""}>
                {product.description
                  ? product.description.length > 35
                    ? product.description.slice(0, 35) + '...'
                    : product.description
                  : ''}
              </td>
              <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{(product.price / 100).toFixed(2)}</td>
              <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.is_published ? 'Yes' : 'No'}</td>
              <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{new Date(product.created_at).toLocaleString()}</td>
              <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{product.stock}</td>
              <td>
                <button className="mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-orange-800/30 dark:text-white" onClick={() => setOpenModals({ ...openModals, [product.id]: true })}>
                  View Images
                </button>
                <ProductImagesModal
                  isOpen={openModals[product.id]}
                  onRequestClose={() => setOpenModals({ ...openModals, [product.id]: false })}
                  product={product}
                />
              </td>
              <td>
                <div>
                  <button className='mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-orange-800/30 dark:text-white' onClick={() => setOpenProductModals({ ...openModals, [product.id]: true })}>Edit Product</button>
                  <ProductEditModal product={product} isOpen={openProductModals[product.id]} onClose={() =>  handleProductChange(product)} />
                </div>
              </td>
              <td>
                {product.is_published ? (
                  <button className="mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-red-800/30 dark:text-white" onClick={() => handleActiveToggle(product.id)}>
                    Deactivate
                  </button>
                ) : (
                  <button className="mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-green-700/30 dark:text-white" onClick={() => handleActiveToggle(product.id)}>
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;