import React from 'react';
import CreditCard from '../components/CreditCardForm';

const CheckoutPage = () => {

    return (
        <div className="container mx-auto p-4 mt-6">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <CreditCard />
        </div>
    );
};

export default CheckoutPage;