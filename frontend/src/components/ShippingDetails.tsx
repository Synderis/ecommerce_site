import React, { useState } from 'react';
import { Card, Input, Button } from '@material-tailwind/react';

interface ShippingDetails {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

const ShippingDetailsForm: React.FC = () => {
    const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
        name: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setShippingDetails({ ...shippingDetails, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(shippingDetails);
        // Call API to save shipping details
    };

    return (
        <Card className="max-w-md mx-auto mt-10 p-6">
            <h2 className="text-lg font-bold mb-4">Shipping Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2">Name</label>
                    <Input
                        type="text"
                        name="name"
                        value={shippingDetails.name}
                        onChange={handleChange}
                        className="w-full py-2 pl-10 text-sm text-gray-700"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2">Address</label>
                    <Input
                        type="text"
                        name="address"
                        value={shippingDetails.address}
                        onChange={handleChange}
                        className="w-full py-2 pl-10 text-sm text-gray-700"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2">City</label>
                    <Input
                        type="text"
                        name="city"
                        value={shippingDetails.city}
                        onChange={handleChange}
                        className="w-full py-2 pl-10 text-sm text-gray-700"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2">State</label>
                    <Input
                        type="text"
                        name="state"
                        value={shippingDetails.state}
                        onChange={handleChange}
                        className="w-full py-2 pl-10 text-sm text-gray-700"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2">Zip</label>
                    <Input
                        type="text"
                        name="zip"
                        value={shippingDetails.zip}
                        onChange={handleChange}
                        className="w-full py-2 pl-10 text-sm text-gray-700"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="text-sm font-medium mb-2">Country</label>
                    <Input
                        type="text"
                        name="country"
                        value={shippingDetails.country}
                        onChange={handleChange}
                        className="w-full py-2 pl-10 text-sm text-gray-700"
                    />
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save Shipping Details
                </Button>
            </form>
        </Card>
    );
};

export default ShippingDetailsForm;