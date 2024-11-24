import React, { useState } from 'react';
import { Card, Input, Button } from '@material-tailwind/react';
import { CreateAddress } from '../services/OrderServices';



const ShippingDetailsForm: React.FC = () => {
    const [sameAsBilling, setSameAsBilling] = useState(false);
    const [shippingDetails, setShippingDetails] = useState({
        full_name: '',
        street_address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        address_type: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setShippingDetails({ ...shippingDetails, [name]: value });
    };


    const handleSubmit = async () => {
        if (Object.keys(shippingDetails).length === 1 && shippingDetails.address_type) {
            // Handle the case where only the address_type is provided
            const address = { address_type: shippingDetails.address_type };
            await CreateAddress(address);
            console.log('Address:', address);
        } else {
            if (sameAsBilling) {
                const shippingAddress = { ...shippingDetails, address_type: 'shipping' };
                await CreateAddress(shippingAddress);
                console.log('Shipping address:', shippingAddress);
                const billingAddress = { ...shippingDetails, address_type: 'billing' };
                await CreateAddress(billingAddress);
                console.log('Billing address:', billingAddress);
            } else {
                const shippingAddress = { ...shippingDetails, address_type: 'shipping' };
                await CreateAddress(shippingAddress);
                console.log('Shipping address:', shippingAddress);
            }
        }
    };

    return (
        <Card className="max-w-md mx-auto p-5 pb-6 mb-8 mt-12 dark:bg-gray-900 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-blue-gray-900">
            <h2 className="text-lg font-bold mb-4 dark:text-orange-300">Shipping Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2 opacity-75 dark:text-white">Name</label>
                    <Input
                        type="text"
                        name="full_name"
                        value={shippingDetails.full_name}
                        onChange={handleChange}
                        placeholder='John Doe'
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2 opacity-75 dark:text-white">Address</label>
                    <Input
                        type="text"
                        name="street_address"
                        value={shippingDetails.street_address}
                        onChange={handleChange}
                        placeholder='123 Main Street'
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2 opacity-75 dark:text-white">City</label>
                    <Input
                        id='city'
                        type="text"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleChange}
                        placeholder='New York'
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2 opacity-75 dark:text-white">State</label>
                    <Input
                        type="text"
                        name="state"
                        value={shippingDetails.state}
                        onChange={handleChange}
                        placeholder='NY'
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2 opacity-75 dark:text-white">Zip</label>
                    <Input
                        type="text"
                        name="zip"
                        value={shippingDetails.zip}
                        onChange={handleChange}
                        placeholder='10001'
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2 opacity-75 dark:text-white">Country</label>
                    <Input
                        type="text"
                        name="country"
                        value={shippingDetails.country}
                        onChange={handleChange}
                        placeholder='United States'
                        className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                        labelProps={{
                            className: "hidden",
                        }}
                    />
                </div>
                <div className="inline-flex items-center mt-2">
                    <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                        <input
                            type="checkbox"
                            className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                            id="check-2"
                            checked={sameAsBilling}
                            onChange={() => setSameAsBilling(!sameAsBilling)}
                        />
                        <span className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="1"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </span>
                    </label>
                    <label className="cursor-pointer ml-2 opacity-75 dark:text-white text-sm" htmlFor="check-2">
                        Billing Details Same as Shipping
                    </label>
                </div>
                <div>
                    <Button onClick={handleSubmit} className="mt-6 mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-orange-800/30 dark:text-white">
                        Save Shipping Details
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default ShippingDetailsForm;