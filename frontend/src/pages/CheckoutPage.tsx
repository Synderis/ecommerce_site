import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Route, Routes } from 'react-router-dom';
import CheckoutForm from "../components/CheckoutForm";
import CompletePage from "./CheckoutComplete";
import { OrderItems } from "../services/OrderServices";


const stripePromise = loadStripe("pk_test_51QOgt3DeMPHtfstrX2ADsMUpQXFSDRS5IXQchRBQHOzw3Bt7E8XYOeoe8TszgKNQt4bF1u19CP6jMKxh1mKfEluN00ZfTF0Y9N");
const CheckoutPage = () => {
    const [clientSecret, setClientSecret] = useState("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const orderData = await OrderItems(1);
            if (orderData) {
                const items = orderData.map((item: { product_id: number; subtotal: number }) => ({
                    id: item.product_id,
                    amount: item.subtotal,
                }));

                fetch("/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ items }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setClientSecret(data.clientSecret);
                        // [DEV] For demo purposes only
                        setDpmCheckerLink(data.dpmCheckerLink);
                    });
            }
        };

        fetchData();
    }, []);

    const appearance = {
        theme: 'stripe' as const,
    };
    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return (
        <div className="container mx-auto p-4 mt-6">
            {clientSecret && (
                <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                    <Routes>
                        <Route path="/checkout" element={<CheckoutForm dpmCheckerLink={dpmCheckerLink} />} />
                        <Route path="/complete" element={<CompletePage />} />
                    </Routes>
                </Elements>
            )}
        </div>
    );
};

export default CheckoutPage;