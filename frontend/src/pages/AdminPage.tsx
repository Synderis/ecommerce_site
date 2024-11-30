import React, { useState } from 'react';
import OrdersTable from '../components/OrdersAdmin';
import UsersTable from '../components/UsersAdmin';
import ProductsTable from '../components/ProductsAdmin';
import ProductCreateModal from '../components/ProductCreateModal';



const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [createProductModalOpen, setCreateProductModalOpen] = useState(false);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <section className='dark:bg-gradient-to-b mb-2 h-screenHeight dark:from-orange-800/10 dark:to-gray-800'>
        <div className="container mx-auto p-4 mt-6">
            <div className="flex justify-center mx-auto mt-8 mb-4">
                <button
                    className={`px-4 py-2 ${activeTab === 'orders' ? 'bg-blue-500 dark:bg-orange-800/30 text-white' : 'bg-gray-200 dark:bg-gray-800'} mx-2 rounded-md`}
                    onClick={() => handleTabChange('orders')}
                >
                    Orders
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'users' ? 'bg-blue-500 dark:bg-orange-800/30 text-white' : 'bg-gray-200 dark:bg-gray-800'} mx-2 rounded-md`}
                    onClick={() => handleTabChange('users')}
                >
                    Users
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'products' ? 'bg-blue-500 dark:bg-orange-800/30 text-white' : 'bg-gray-200 dark:bg-gray-800'} mx-2 rounded-md`}
                    onClick={() => handleTabChange('products')}
                >
                    Products
                </button>
                
            </div>
            <div className="flex justify-end mx-auto mt-8 mb-4">
            <button
                    className={`px-4 py-2 bg-blue-500 dark:bg-orange-800/30 text-white rounded-md bg-gray-200`}
                    onClick={() => setCreateProductModalOpen(true)}
                >
                    Create Product
            </button>
            </div>
            {createProductModalOpen && <ProductCreateModal isOpen={createProductModalOpen} onClose={() => setCreateProductModalOpen(false)} />}
            {activeTab === 'orders' && (
                <div>
                    <h2>Orders</h2>
                    <OrdersTable />
                </div>
            )}
            {activeTab === 'users' && (
                <div>
                    <h2>Users</h2>
                    <UsersTable />
                </div>
            )}
            {activeTab === 'products' && (
                <div>
                    <h2>Products</h2>
                    <ProductsTable />
                </div>
            )}
        </div>
        </section>
    );
};

export default AdminDashboard;