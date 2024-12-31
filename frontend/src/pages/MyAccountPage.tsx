import { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { MyOrders, OrderItems, FinishOrder, ValidateOrder, DeleteOrder } from "../services/OrderServices";
import { AccountPageSkeleton } from "../components/PageSkeletons";
import { Order } from "../utils/types";
import { s3_bucket_url } from "../utils/utils";
import { useUser } from '../context/UserContext';
import "./supp.css";

const MyAccount = () => {
    const userContext = useUser();
    const userData = userContext?.user;
    // const userLoading = userContext?.loading;
    const [ordersData, setOrdersData] = useState<Order[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [cartItems, setCartItems] = useState<Order['order_items'] | null>(null);
    const [loading, setLoading] = useState(true);
    const hasFetchedData = useRef(false);

    const fetchOrders = async () => {
        const orders = await MyOrders();
        setOrdersData(orders);
    };

    useEffect(() => {
        if (!hasFetchedData.current && userData && !userContext.loading) {
            setLoading(true);
            fetchOrders().finally(() => {
                setLoading(false);
                hasFetchedData.current = true;
            });
        }
    }, [userData, userContext?.loading]);

    const handleProcessPayment = async (order_id: number) => {
        console.log(`order id test: ${order_id}`);
        const validate = await ValidateOrder(order_id);
        if (!validate) {
            alert('Items in your order are no longer available. Please make a new order.');
            return;
        }
        const response = await FinishOrder(order_id);
        const url = `${response[0]}`;
        console.log(response);
        console.log(url);
        window.location.href = url;
    };

    const handleDeleteOrder = async (order_id: number) => {
        const response = await DeleteOrder(order_id);
        console.log(response);
        const orders = await MyOrders();
        setOrdersData(orders);
    };

    const handleCartClick = async (order_id: number) => {
        const response = await OrderItems(order_id);
        console.log(response);
        setCartItems(response);
        setShowModal(true);
    };

    if (loading || !userData) {
        return <AccountPageSkeleton />;
    }

    return (
        <section className="dark:bg-gradient-to-b flex flex-grow pt-12 h-full dark:from-orange-800/10 dark:to-gray-800">
            <div className="container mx-auto p-1 px-1">
                <Typography variant="h2" className="mb-4">
                    My Account
                </Typography>
                <div className="flex flex-col mb-4">
                    <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                        {userData.username}
                    </Typography>
                </div>
                <div className="flex flex-col mb-4">
                    <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                        {userData.email}
                    </Typography>
                </div>
                <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 dark:bg-gradient-to-b dark:from-orange-300/30 dark:to-blue-gray-900 lg:w-1/2 overflow-hidden text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
                    <table className="w-full lg:w-full pr-12 text-left lg:text-center table-auto lg:min-w-2/3 lg:pl-7 lg:ml-3">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="lg:p-1 pt-2 pl-2 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Order ID</th>
                                <th className="lg:p-1 pt-2 text-sm border-b text-center border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Total</th>
                                <th className="lg:p-1 pt-2 text-sm border-b text-center border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Date</th>
                                <th className="lg:p-1 pt-2 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Shipped</th>
                                <th className="text-sm font-normal leading-none text-slate-500"></th>
                                <th className="text-sm font-normal leading-none text-slate-500"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ordersData && ordersData.length > 0 ? (
                                ordersData.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50">
                                        <td className="pl-2 p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white lg:text-center">{order.id}</td>
                                        <td className="p-0 pr-2 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white lg:text-center">${(order.order_total / 100).toFixed(2)}</td>
                                        <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white text-center">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white text-center">{order.shipped_at ? 'Yes' : 'No'}</td>
                                        <td className="py-0 lg:px-0 px-1 dark:opacity-80">
                                            <Button
                                                className="bg-orange-300 py-0 px-0 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 lg:w-20 w-12 lg:h-10 h-8"
                                                onClick={() => handleCartClick(order.id)}
                                            >
                                                Items
                                            </Button>
                                        </td>
                                        {order.completed_at ? (
                                            <td className="py-5 px-0 dark:opacity-80"></td>
                                        ) : (
                                            <td className="py-5 px-0 dark:opacity-80">
                                                <Button
                                                    className="bg-orange-300 py-0 pl-1 pr-1 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-18 lg:w-20 lg:h-10 h-8"
                                                    onClick={() => handleProcessPayment(order.id)}
                                                >
                                                    Finish order
                                                </Button>
                                            </td>
                                        )}
                                        {order.completed_at ? (
                                            <td className="py-5 px-0 dark:opacity-80"></td>
                                        ) : (
                                            <td className="py-5 px-0 dark:opacity-80">
                                            <button type="button" className="text-slate-500 hover:text-slate-700 dark:opacity-80 dark:active:bg-orange-800/30  lg:dark:hover:text-orange-500 dark:text-orange-500 hover:scale-105" onClick={() => handleDeleteOrder(order.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                            </td>
                                        )}
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan={4} className="p-1 text-sm border-b border-slate-200 text-center">
                                            No orders yet.
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                {showModal && cartItems && (
                    <div
                        className="fixed inset-0 lg:w-full w-2/3 flex items-center justify-center z-50"
                        onClick={() => setShowModal(false)}
                    >
                        <div className="dark:bg-gray-800 p-8 lg:ml-0 ml-32 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-2 lg:px-4 border-b font-normal border-orange-300 dark:text-orange-300">Image</th>
                                        <th className="py-2 px-2 lg:px-4 border-b font-normal border-orange-300 dark:text-orange-300">Product</th>
                                        <th className="py-2 px-2 lg:px-4 border-b font-normal border-orange-300 dark:text-orange-300">Quantity</th>
                                        <th className="py-2 px-2 lg:px-4 border-b font-normal border-orange-300 dark:text-orange-300">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="py-2 px-2 lg:px-4 text-white opacity-70"><img src={`${s3_bucket_url}/${item.product.thumbnail}`} alt="product" className="w-16 h-16 object-cover rounded" /></td>
                                            <td className="py-2 px-2 lg:px-4 text-white opacity-70 text-center">{item.product.title}</td>
                                            <td className="py-2 px-2 lg:px-4 text-white opacity-70 text-center">{item.quantity}</td>
                                            <td className="py-2 px-2 lg:px-4 text-white opacity-70 text-center">${(item.subtotal / 100).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="text-white opacity-70 hover:opacity-95" onClick={() => { setShowModal(false) }}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default MyAccount;