import React, { useEffect } from "react";
import { MyCart } from "../services/GetCarts";
import { UpdateCart } from "../services/UpdateCartItems";
import { useMediaQuery } from 'react-responsive';
import { truncate } from '../utils/utils';
import { Cart } from "../utils/types";



const CurrentCart = () => {
    const [cart, setCart] = React.useState<Cart | null>(null);
    const [cartItems, setCartItems] = React.useState<Cart['cart_items'] | null>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [cartTotalAmount, setCartTotalAmount] = React.useState<Cart['total_amount']>(0);

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

    useEffect(() => {
        const fetchCart = async () => {
            const response = await MyCart();
            console.log(response.carts[0]);
            setCart(response.carts[0]);
            setCartItems(response.carts[0].cart_items);
            setCartTotalAmount(response.carts[0].total_amount);
        };
        fetchCart();
    }, []);

    

    const handleRemoveFromCart = async (product_id: number) => {
        if (!cart || !cartItems || isUpdating) return;

        setIsUpdating(true); // Start update

        const updatedCartItems = cartItems.filter((item) => item.product.id !== product_id);
        setCartItems(updatedCartItems);

        const newTotalAmount = updatedCartItems.reduce((acc, item) => acc + item.subtotal, 0);
        setCartTotalAmount(newTotalAmount);

        try {
            await UpdateCart(cart.id, updatedCartItems);
        } catch (error) {
            console.error("Failed to update cart:", error);
            setCartItems(cart.cart_items); // Revert cart items
            setCartTotalAmount(cart.total_amount); // Revert total amount
        } finally {
            setIsUpdating(false); // End update
        }
    };


    return (
        <div className="container mx-auto px-4">
            <div className="w-full flex justify-between items-center mb-3 mt-8 pl-7">
                <div>
                    <h3 className="text-lg font-semibold text-slate-800">Shopping Cart</h3>
                    <p className="text-slate-500">Review your selected items.</p>
                </div>
                <div className="mx-3">
                    <div className="w-full max-w-sm min-w-[200px] relative">
                        <div className="relative">
                            <input
                                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                placeholder="Search for product..."
                            />
                            <button
                                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </div>
                        <div className="text-sm text-slate-500 mt-2">Total: {cartTotalAmount}</div>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-col w-full h-full overflow-hidden text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-left table-auto min-w-max pl-7 ml-3">
                    <thead>
                        <tr className="border-b border-slate-300 bg-slate-50">
                            <th className="p-1 text-sm font-normal leading-none text-slate-500">Product</th>
                            <th className="p-1 text-sm font-normal leading-none text-slate-500">Name</th>
                            <th className="p-1 text-sm font-normal leading-none text-slate-500">Quantity</th>
                            <th className="p-1 text-sm font-normal leading-none text-slate-500">Subtotal</th>
                            <th className="p-1 text-sm font-normal leading-none text-slate-500"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems?.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50">
                                <td className="p-0 border-b border-slate-200 py-5"><img src={`http://localhost:8000/assets/${item.product.thumbnail}`} alt="product" className="w-16 h-16 object-cover rounded" /></td>
                                <td className="p-0 border-b border-slate-200 py-5 text-ellipsis overflow-hidden whitespace-nowrap truncate lg:truncate" title={item.product.title}>{isLargeScreen ? item.product.title : truncate(item.product.title, 3)}</td>
                                <td className="p-0 border-b border-slate-200 py-5">{item.quantity}</td>
                                <td className="p-0 border-b border-slate-200 py-5">{item.subtotal}</td>
                                <td className="p-0 border-b border-slate-200 py-5 pr-4">
                                    <button type="button" className="text-slate-500 hover:text-slate-700" onClick={() => handleRemoveFromCart(item.product.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CurrentCart;