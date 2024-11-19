import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    // Card,
} from "@material-tailwind/react";

import { Routes, Link, Route } from 'react-router-dom';
import { routes } from "../utils/routes";
// import SingleProductPage from "../pages/ProductPage";
import FooterBar from "./Footer";
// import { themeToggle } from "../utils/utils";
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";

export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const [dark, setDark] = React.useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
        localStorage.setItem('dark-mode', !dark ? 'true' : 'false');
    }


    React.useEffect(() => {
        const storedDarkMode = localStorage.getItem('dark-mode');
        if (storedDarkMode === 'true') {
            setDark(true);
            document.body.classList.add("dark");
        }
    }, []);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/" className="flex items-center dark:text-orange-300">
                    Home
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/products" className="flex items-center dark:text-orange-300">
                    Products
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/account" className="flex items-center dark:text-orange-300">
                    Account
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a href="/my-cart" className="flex items-center dark:text-orange-300">
                    Cart
                </a>
            </Typography>
        </ul>
    );

    return (
        // max-h-[768px]
        <div className="-m-6  w-[calc(100%+24px)] dark:bg-gray-800 overflow-visible">
            <Navbar className="sticky top-0 border-t-0 border-r-0 dark:border-orange-300 dark:bg-gray-800 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
                <div className="flex items-center justify-between text-blue-gray-900">
                    <Typography
                        as="a"
                        href="#"
                        className="mr-4 cursor-pointer py-1.5 font-medium dark:text-orange-300"
                    >
                        Synderis Ecommerce App
                    </Typography>
                    <button onClick={() => darkModeHandler()}>
                        {

                            dark && <IoSunny />
                        }
                        {
                            !dark && <IoMoon />
                        }
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="mr-4 hidden lg:block">{navList}</div>
                        <div className="flex items-center gap-x-1">
                            <Link to={"/sign-in"}>
                                <Button
                                    variant="text"
                                    size="sm"
                                    className="hidden lg:inline-block"
                                >
                                    <span>Log In</span>
                                </Button>
                            </Link>
                            <Link to={"/sign-up"}>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block"
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

