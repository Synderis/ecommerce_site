import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { MyCart } from "../services/GetCarts";
import { MyOrders } from "../services/GetOrders";
import { Order, UserData } from "../utils/types";


const MyAccount = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [ordersData, setOrdersData] = useState<Order | null>(null);
    // const token = 'Bearer ' + localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await MyCart();
            const orders = await MyOrders();
            console.log(response);
            setUserData(response);
            setOrdersData(orders);
        };
        fetchUserData();
    }, []);
    console.log(userData);
    console.log(ordersData);




    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <section className="dark:bg-gradient-to-b pt-20 dark:from-orange-800/10 dark:to-gray-800">
        <div style={{ marginLeft: '200px', width: '80%'}}>
            <Typography variant="h2" className="mb-4">
                My Account
            </Typography>
            <div className="flex flex-col mb-4">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                    {userData.username}
                </Typography>
                {/* <Input
                    type="text"
                    value={userData.username}
                    readOnly
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                /> */}
            </div>
            <div className="flex flex-col mb-4">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                    {userData.email}
                </Typography>
                {/* <Input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                /> */}
            </div>
            {ordersData && (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th className="py-3 px-6">ID</th>
                    <th className="py-3 px-6">Item Total</th>
                    <th className="py-3 px-6">Tax Total</th>
                    <th className="py-3 px-6">Shipping Total</th>
                    <th className="py-3 px-6">Order Total</th>
                    <th className="py-3 px-6">Order Timestamp</th>
                    <th className="py-3 px-6">Completed</th>
                    <th className="py-3 px-6">Shipped</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(ordersData) && ordersData.map((order) => (
                    <tr key={order.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="py-4 px-6">{order.id}</td>
                        <td className="py-4 px-6">{order.item_total}</td>
                        <td className="py-4 px-6">{order.tax_total}</td>
                        <td className="py-4 px-6">{order.shipping_total}</td>
                        <td className="py-4 px-6">{order.order_total}</td>
                        <td className="py-4 px-6">{order.order_timestamp}</td>
                        <td className="py-4 px-6">{order.completed ? 'Yes' : 'No'}</td>
                        <td className="py-4 px-6">{order.shipped ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
                </table>
            )}
        </div>
    </section>
    );
}

export default MyAccount;