import { useState, useEffect } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { MyInfo } from "../services/GetInfo";
import { MyOrders } from "../services/OrderServices";
import { Order, UserData, Cart } from "../utils/types";
import { MyCart } from "../services/CartServices";


const MyAccount = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [ordersData, setOrdersData] = useState<Order | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [cartItems, setCartItems] = useState<Cart['cart_items'] | null>(null);
    // const token = 'Bearer ' + localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await MyInfo();
            const orders = await MyOrders();
            console.log(response);
            setUserData(response);
            setOrdersData(orders);
        };
        fetchUserData();
    }, []);
    console.log(userData);
    console.log(ordersData);


    const handleCartClick = async ( cart_id: number ) => {
        const response = await MyCart( cart_id );
        console.log(response.cart_items);
        setCartItems(response.cart_items);
        setShowModal(true);
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <section className="dark:bg-gradient-to-b pt-12 h-screen dark:from-orange-800/10 dark:to-gray-800 ">
        <div className="container mx-auto p-4">
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
            <div className="overflow-x-auto">
            <table className="w-full lg:w-2/3 mx-auto w-1/2 text-sm text-left rounded-lg overflow-hidden text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                    <th className="py-2 px-2">Total</th>
                    <th className="py-2 px-2">Date</th>
                    {/* <th className="py-2 px-2">Completed</th> */}
                    <th className="py-2 px-2">Shipped</th>
                    <th className="py-2 w-20"></th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(ordersData) && ordersData.map((order) => (
                    <tr key={order.id} className="bg-white dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-2 px-2">${order.order_total}</td>
                        <td className="py-2 px-2">{new Date(order.order_timestamp).toLocaleDateString()}</td>
                        {/* <td className="py-2 px-2">{order.completed ? 'Yes' : 'No'}</td> */}
                        <td className="py-2 px-2">{order.shipped ? 'Yes' : 'No'}</td>
                        <Button
                            className="bg-orange-300 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 w-20"
                            onClick={() => handleCartClick(order.cart_id)}
                            >
                            Items
                        </Button>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            )}
            {showModal && cartItems && (
                <div
                className="fixed inset-0 lg:w-full w-2/3 flex items-center justify-center z-50"
                onClick={() => setShowModal(false)}
                >
                    <div className="dark:bg-gray-700 p-8 lg:ml-0 ml-32 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th className="py-2 px-2 lg:px-4">Image</th>
                            <th className="py-2 px-2 lg:px-4">Product</th>
                            <th className="py-2 px-2 lg:px-4">Quantity</th>
                            <th className="py-2 px-2 lg:px-4">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                            <td className="py-2 px-2 lg:px-4"><img src={`http://localhost:8000/assets/${item.product.thumbnail}`} alt="product" className="w-16 h-16 object-cover rounded" /></td>
                            <td className="py-2 px-2 lg:px-4">{item.product.title}</td>
                            <td className="py-2 px-2 lg:px-4">{item.quantity}</td>
                            <td className="py-2 px-2 lg:px-4">${item.subtotal}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <button onClick={() => { setShowModal(false) }}>Close</button>
                    </div>
                </div>
                )}
        </div>
    </section>
    );
}

export default MyAccount;