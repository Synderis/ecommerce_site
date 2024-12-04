import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Input, Typography } from "@material-tailwind/react";
import { api_url } from "../utils/utils";

const SignUpForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        username: "",
        password: "",
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign up");
        console.log(formData);
        const url = `${api_url}/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("Sign up successful");
            navigate("/");
        } else {
            console.log("Sign up failed");
            if (data.detail === "Email already exists") {
                alert("Email already exists");
            } else if (data.detail === "Username already exists") {
                alert("Username already exists");
            } else {
                alert("Internal Server Error");
            }
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({ ...formData, [id]: value });
    };

    return (
        // <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '95vh' }}>
        <section className="grid text-center lg:mt-[-10rem] lg:mb-[-6rem] h-screen items-center p-8 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800">
            {/* <div className="relative flex flex-col rounded-xl bg-transparent mx-auto my-auto items-center justify-center"> */}
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-1 text-slate-500">
                    Sign Up
                </Typography>
                <Typography className="mb-4 text-gray font-normal text-[18px]">
                    Enter your information to sign up
                </Typography>
                <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-1 flex flex-col gap-6">
                        <div className="md-3">
                            <label htmlFor="full_name">
                                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                                    Name
                                </Typography>
                            </label>
                            <Input
                                onChange={handleChange}
                                id="full_name"
                                color="gray"
                                size="lg"
                                type="text"
                                placeholder="john doe"
                                className="w-full placeholder:opacity-100 text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="md-3">
                            <label htmlFor="email">
                                <Typography variant="small" className="mb-2 block font-medium text-gray-900 dark:focus:border-orange-300">
                                    Email
                                </Typography>
                            </label>
                            <Input
                                onChange={handleChange}
                                id="email"
                                required
                                color="gray"
                                size="lg"
                                type="email"
                                name="email"
                                placeholder="name@mail.com"
                                className="w-full placeholder:opacity-100 text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username">
                                <Typography variant="small" className="mb-2 block font-medium text-gray-900 dark:focus:border-orange-300">
                                    User Name
                                </Typography>
                            </label>
                            <Input
                                onChange={handleChange}
                                id="username"
                                required
                                color="gray"
                                size="lg"
                                type="text"
                                name="username"
                                placeholder="user name"
                                className="w-full placeholder:opacity-100 text-gray-900 focus:border-t-primary border-t-blue-gray-200 dark:focus:border-orange-300"
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="md-3">
                            <label htmlFor="password">
                                <Typography variant="small" className="mb-2 block font-medium text-gray-900 dark:focus:border-orange-300">
                                    Password
                                </Typography>
                            </label>
                            <Input
                                id="password"
                                onChange={handleChange}
                                autoComplete="new-password"
                                name="password"
                                required
                                size="lg"
                                placeholder="********"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full bg-transparent placeholder:text-slate-400 text-gray-900 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow dark:focus:border-orange-300"
                                type={passwordShown ? "text" : "password"}
                                icon={
                                    <i onClick={togglePasswordVisiblity}>
                                        {passwordShown ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" />}
                                    </i>
                                }
                            />
                        </div>
                    </div>
                    <div className="inline-flex items-center mt-2">
                        <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                            <input
                                type="checkbox"
                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                id="check-2"
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
                        <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
                            Remember Me
                        </label>
                    </div>
                    <button
                        className="mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-orange-800/30 dark:text-white"
                        type="submit"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SignUpForm;
