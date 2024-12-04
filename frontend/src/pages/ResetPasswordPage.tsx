import React, { useState } from 'react';
import { Button, Typography, Input } from '@material-tailwind/react';
import { api_url } from "../utils/utils";
import { useParams } from 'react-router-dom';
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import 'tailwindcss/tailwind.css';

const ResetPassword = () => {
    const { reset_token } = useParams();
    const [formData, setFormData] = useState({
        reset_token: reset_token,
        new_password: "",
        confirm_password: "",
    });
    const [error, setError] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        if (id === 'password' || id === 'confirm_password') {
            setFormData({ ...formData, [id]: value });
            return;
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`${api_url}/auth/reset-password/${formData.reset_token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
                    Reset Password
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
                    <Input
                        id="new_password"
                        onChange={handleChange}
                        size="lg"
                        placeholder="********"
                        labelProps={{
                            className: "hidden",
                        }}
                        className="w-full placeholder:opacity-100 focus:border-t-primary text-gray-900 border-t-blue-gray-200 dark:focus:border-orange-300"
                        type={passwordShown ? "text" : "password"}
                        icon={
                            <i onClick={togglePasswordVisiblity}>
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </i>
                        }
                    />
                    <Input
                        id="confirm_password"
                        onChange={handleChange}
                        size="lg"
                        placeholder="********"
                        labelProps={{
                            className: "hidden",
                        }}
                        className="w-full placeholder:opacity-100 focus:border-t-primary text-gray-900 border-t-blue-gray-200 dark:focus:border-orange-300"
                        type={passwordShown ? "text" : "password"}
                        icon={
                            <i onClick={togglePasswordVisiblity}>
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </i>
                        }
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

export default ResetPassword;