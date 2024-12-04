import React, { useEffect, useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    // Card,
} from "@material-tailwind/react";

import { Routes, Link, Route, useLocation } from 'react-router-dom';
import { routes } from "../utils/routes";
import FooterBar from "./Footer";
import { Logout } from "../services/LogoutUser";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { MyInfo } from "../services/GetInfo";
// import { UserData } from "../utils/types";

export function StickyNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const [dark, setDark] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    // const [user, setUser] = useState<UserData | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();


    const darkModeHandler = () => {
        setDark(!dark);
        if (!dark) {
            document.body.style.backgroundColor = 'rgb(66, 66, 66)';
        } else {
            document.body.style.backgroundColor = '';
        }
        document.body.classList.toggle("dark");
        localStorage.setItem('dark-mode', !dark ? 'true' : 'false');
    }


    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
        // Logic to get the user information from the authentication provider
        // For example, you can use the `auth` object from Firebase Authentication
        // or any other authentication provider
        const getUser = async () => {
            if (!localStorage.getItem('token')) {
                return;
            }
            const userLogin = await MyInfo();
            if (userLogin) {
                console.log(userLogin);
                if (userLogin.role === 'admin') {
                    setIsAdmin(true);
                }
                // setUser(userLogin);
            }
        }; // <--- Add a semicolon here to end the function declaration
        getUser();
        // Clean up the subscription when the component unmounts
    }, [location]);


    useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark-mode');
        if (storedDarkMode === 'true') {
            setDark(true);
            document.body.classList.add("dark");
        }
    }, []);


    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        Logout();
        setLoggedIn(false)
    };

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {isAdmin && (
                <Typography
                    as="li"
                    variant="small"
                    color="blue-gray"
                    className="p-1 font-normal"
                >
                    <Link to={'/admin'} className="relative flex items-center dark:text-orange-300 group">
                        Admin
                        <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-orange-300 dark:bg-orange-300 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </Typography>
            )}
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/'} className="relative flex items-center dark:text-orange-300 group">
                    Home
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-orange-300 dark:bg-orange-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/products'} className="relative flex items-center dark:text-orange-300 group">
                    Products
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-orange-300 dark:bg-orange-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/my-account'} className="relative flex items-center dark:text-orange-300 group">
                    Account
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-orange-300 dark:bg-orange-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to={'/my-cart'} className="relative flex items-center dark:text-orange-300 group">
                    Cart
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-orange-300 dark:bg-orange-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </Typography>
        </ul>
    );

    return (
        // max-h-[768px]
        <div className="-m-6  w-[calc(100%+24px)] dark:bg-gray-800 overflow-visible">
            <Navbar className="sticky top-0 border-t-0 border-r-0 dark:border-orange-300 dark:bg-gray-800 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Link to={"/"}>
                        <Typography
                            as="a"
                            className="mr-4 cursor-pointer py-1.5 font-medium dark:text-orange-300"
                        >
                            Synderis Ecommerce App
                        </Typography>
                    </Link>
                    <button onClick={() => darkModeHandler()}>
                        {dark && <IoSunny />}
                        {!dark && <IoMoon />}
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center ml-1 gap-x-1">
                            {loggedIn ? (
                                <Button
                                    variant="text"
                                    size="sm"
                                    className="bg-orange-300 dark:bg-orange-800/30 dark:hover:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-1 hover:scale-105 focus:scale-105 active:scale-100 rounded-md px-2 py-1"
                                    onClick={() => handleLogout()}
                                >
                                    Log out
                                </Button>
                            ) : (
                                <Link to={"/sign-in"}>
                                    <Button
                                        variant="text"
                                        size="sm"
                                        className="bg-orange-300 dark:bg-orange-800/30 dark:hover:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-1 hover:scale-105 focus:scale-105 active:scale-100 rounded-md px-2 py-1"
                                    >
                                        Log in
                                    </Button>
                                </Link>
                            )}
                            <Link to={"/sign-up"}>
                                <Button
                                    variant="text"
                                    size="sm"
                                    className="bg-orange-300 dark:bg-orange-800/30 dark:hover:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-1 hover:scale-105 focus:scale-105 focus:shadow-none active:scale-100 rounded-md px-2 py-1"
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                        <IconButton
                            variant="text"
                            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                            ripple={false}
                            onClick={() => setOpenNav(!openNav)}
                        >
                            {openNav ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    className="h-6 w-6"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            )}
                        </IconButton>
                    </div>
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    <div className="flex items-center gap-x-1">
                        <Button fullWidth variant="text" size="sm">
                            <span className="dark:text-orange-300">Log In</span>
                        </Button>
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Sign Up</span>
                        </Button>
                    </div>
                </MobileNav>
            </Navbar>
            <Routes>
                {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
            </Routes>
            {navList && (
                <FooterBar />
            )}
        </div>
    );
}

