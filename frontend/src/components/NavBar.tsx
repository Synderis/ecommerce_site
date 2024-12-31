import React, { useEffect, useState } from "react";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Collapse,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout } from "../services/UserServices";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import { useUser } from '../context/UserContext';

export function StickyNavbar() {
    const [openNav, setOpenNav] = useState(false);
    const [dark, setDark] = useState(true); // Default to dark mode
    const { user, setUser } = useUser() || {};
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const darkModeHandler = () => {
        if (!dark) {
            setDark(true);
            document.body.style.backgroundColor = 'rgb(66, 66, 66)';
            document.body.classList.add("dark");
        } else {
            setDark(false);
            document.body.style.backgroundColor = 'rgb(255, 255, 255)';
            document.body.classList.remove("dark");
        }
        localStorage.setItem('dark-mode', !dark ? 'true' : 'false');
    }

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark-mode');
        if (storedDarkMode === 'false') {
            setDark(false);
        } else {
            setDark(true);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setLoggedIn(true);
        }
        if (user && user.role === 'admin') {
            setIsAdmin(true);
        }
    }, [location, user]);

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        Logout();
        setUser && setUser(null);
        setLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
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
                    <Link to={'/admin'} onClick={() => setOpenNav(false)} className="relative flex items-center dark:text-orange-300 group">
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
                <Link to={'/'} onClick={() => setOpenNav(false)} className="relative flex items-center dark:text-orange-300 group">
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
                <Link to={'/products'} onClick={() => setOpenNav(false)} className="relative flex items-center dark:text-orange-300 group">
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
                <Link to={'/my-account'} onClick={() => setOpenNav(false)} className="relative flex items-center dark:text-orange-300 group">
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
                <Link to={'/my-cart'} onClick={() => setOpenNav(false)} className="relative flex items-center dark:text-orange-300 group">
                    Cart
                    <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-orange-300 dark:bg-orange-300 transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="sticky top-0 border-t-0 border-r-0 border-l-0 dark:border-orange-300 dark:bg-gray-800 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-2">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Link to={"/"}>
                    <div className="flex items-center">
                        <Typography
                            as="a"
                            className="cursor-pointer py-1.5 font-medium dark:text-orange-300"
                        >
                            SuperCrazyChick
                        </Typography>
                        <img src={`${window.location.origin}/SCC-Logo512.png`} alt="Logo" className="h-8 w-auto ml-1" />
                    </div>
                </Link>
                <button onClick={() => darkModeHandler()}>
                    {!dark && <IoMoon />}
                    {dark && <IoSunny />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    <div className="flex items-center ml-1 gap-x-1">
                        {loggedIn ? (
                            <Button
                                variant="text"
                                size="sm"
                                className="bg-orange-300 dark:bg-orange-800/30 dark:active:bg-orange-800/30  lg:dark:hover:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-1 hover:scale-105 focus:scale-105 active:scale-100 rounded-md px-2 py-1"
                                onClick={() => handleLogout()}
                            >
                                Log out
                            </Button>
                        ) : (
                            <Link to={"/sign-in"}>
                                <Button
                                    variant="text"
                                    size="sm"
                                    className="bg-orange-300 dark:bg-orange-800/30 dark:active:bg-orange-800/30  lg:dark:hover:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-1 hover:scale-105 focus:scale-105 active:scale-100 rounded-md px-2 py-1"
                                >
                                    Log in
                                </Button>
                            </Link>
                        )}
                        <Link to={"/sign-up"}>
                            <Button
                                variant="text"
                                size="sm"
                                className="bg-orange-300 dark:bg-orange-800/30 dark:active:bg-orange-800/30  lg:dark:hover:bg-orange-800/30 text-blue-gray-900 dark:text-white shadow-1 hover:scale-105 focus:scale-105 focus:shadow-none active:scale-100 rounded-md px-2 py-1"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-0 mr-0 px-0 h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
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
            <Collapse open={openNav}>
                {navList}
            </Collapse>
        </Navbar>
    );
}

