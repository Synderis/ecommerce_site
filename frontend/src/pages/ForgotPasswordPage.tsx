import React, { useState } from 'react';
import { Button, Typography, Input } from '@material-tailwind/react';
import { api_url} from "../utils/utils";
import 'tailwindcss/tailwind.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setEmail(value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(email);
        try {
            // const params = new URLSearchParams();
            // params.append('email', email);
            const url = new URL(`${api_url}/auth/forgot-password/${email}`);
            const response = await fetch(url.toString(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                alert('Reset link sent to your email!');
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="grid text-center lg:mt-[-10rem] mt-[-10rem] lg:mb-[-6rem] h-screen items-center p-8 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800">
            {/* <div className="container mx-auto min-h-screen lg:h-screenHeight px-4"> */}
            <div className="w-full max-w-md mx-auto">
            <Typography variant="h4" className="mb-4">
                Forgot Password
            </Typography>
            <form onSubmit={handleSubmit}>
                <label className="block mb-2 text-left">Email:</label>
                <Input
                    onChange={handleChange}
                    id="email"
                    required
                    color="gray"
                    size="lg"
                    type="email"
                    name="email"
                    placeholder="name@mail.com"
                    className="w-full placeholder:opacity-100 mb-4 text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <Button type="submit" color="gray" size="lg" className="mt-6 mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 hover:scale-105 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-orange-800/30 dark:text-white" fullWidth>
                    Send Reset Link
                </Button>
            </form>
            {error && (
                <Typography className="text-red-500 mt-4">
                    {error}
                </Typography>
            )}
        </div>
        </section>
    );
};

export default ForgotPassword;