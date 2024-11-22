import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { MyInfo } from "../services/GetInfo";
import { UpdateCart } from "../services/UpdateCartItems";
import { useMediaQuery } from 'react-responsive';
import { truncate } from '../utils/utils';
import { Cart } from "../utils/types";
import { Link } from "react-router-dom";



const CurrentCart = () => {
    const [cart, setCart] = React.useState<Cart | null>(null);
    const [cartItems, setCartItems] = React.useState<Cart['cart_items'] | null>(null);
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [cartTotalAmount, setCartTotalAmount] = React.useState<Cart['total_amount']>(0);

    const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await MyInfo();
                console.log(response.carts[0]);
                setCart(response.carts[0]);
                setCartItems(response.carts[0].cart_items);
                setCartTotalAmount(response.carts[0].total_amount);
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
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
        <section className="dark:bg-gradient-to-b mb-2 h-screenHeight dark:from-orange-800/10 dark:to-gray-800">
            <div className="container mx-auto min-h-screen lg:h-screenHeight px-4">
                <div className="w-full flex justify-between items-center mb-3 pt-8 pl-7">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Shopping Cart</h3>
                        <p className="text-slate-500">Review your selected items.</p>
                    </div>
                    <div className="mx-3">
                        <div className="w-full max-w-sm min-w-[200px] relative">
                            <Link to="/shipping-details">
                                <Button
                                    className="bg-orange-300 dark:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                                >
                                    Checkout
                                </Button>
                            </Link>
                            <div className="text-lg text-slate-500 mt-2 dark:text-orange-300">Total: {cartTotalAmount}</div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-col lg:p-4 dark:bg-gray-800 lg:dark:bg-gradient-to-b lg:dark:from-orange-300/30 lg:dark:to-blue-gray-900 w-full h-full overflow-hidden text-gray-700 bg-white lg:shadow-md rounded-lg bg-clip-border">
                    <table className="w-full text-left table-auto min-w-max pl-7 ml-3">
                        <thead>
                            <tr className="bg-slate-50">
                                <th className="p-1 text-sm border-b border-slate-300 font-normal leading-none text-slate-500 dark:opacity-80 dark:text-white">Product</th>
                                <th className="p-1 text-sm font-normal border-b border-slate-300 leading-none text-slate-500 dark:opacity-80 dark:text-white">Name</th>
                                <th className="p-1 text-sm font-normal border-b border-slate-300 leading-none text-slate-500 dark:opacity-80 dark:text-white">Quantity</th>
                                <th className="p-1 text-sm font-normal border-b border-slate-300 leading-none text-slate-500 dark:opacity-80 dark:text-white">Subtotal</th>
                                <th className="text-sm font-normal leading-none text-slate-500"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems && cartItems.length > 0 ? (
                                cartItems.map((item) => (
                                    <tr key={item.product.id} className="hover:bg-slate-50">
                                        <td className="p-0 border-b border-slate-200 py-5"><img src={`http://localhost:8000/assets/${item.product.thumbnail}`} alt="product" className="w-16 h-16 object-cover rounded" /></td>
                                        <td className="p-0 border-b border-slate-200 py-5 text-ellipsis overflow-hidden whitespace-nowrap truncate lg:truncate dark:opacity-80 dark:text-white" title={item.product.title}>{isLargeScreen ? item.product.title : truncate(item.product.title, 3)}</td>
                                        <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{item.quantity}</td>
                                        <td className="p-0 border-b border-slate-200 py-5 dark:opacity-80 dark:text-white">{item.subtotal}</td>
                                        <td className="py-5 dark:opacity-80">
                                            <button type="button" className="text-slate-500 hover:text-slate-700 dark:opacity-80 dark:hover:text-orange-500 dark:text-orange-500" onClick={() => handleRemoveFromCart(item.product.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-1 text-sm border-b border-slate-200 text-center">
                                        Your cart is empty.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default CurrentCart;