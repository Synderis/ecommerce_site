import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { api_url } from "../utils/utils";
import { Link } from "react-router-dom";
import { local_url } from "../utils/utils";
import { useUser } from '../context/UserContext';

const SignInForm = () => {

    const navigate = useNavigate();
    const userContext = useUser();
    const { setUser } = userContext || {};
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loggedIn, setLoggedIn] = useState(false);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    const clientId = "string";
    const clientSecret = "string";
    const grantType = "password";
    const scope = "";

    const [formData, setFormData] = useState({
        grant_type: grantType,
        username: "",
        password: "",
        scope: scope,
        client_id: clientId,
        client_secret: clientSecret,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Sign in");
        console.log(formData);
        const url = `${api_url}/auth/login`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams(formData).toString(),
        });
        const data = await response.json();

        if (response.ok) {
            console.log("Sign in successful");
            localStorage.setItem("token", data.access_token);
            localStorage.setItem('refreshToken', data.refresh_token);
            
            if (setUser) {
                setUser(data.user); // Update user data in the context
            }
            setLoggedIn(true);
            navigate("/"); // Redirect to home page
            window.location.reload(); // Reload the window
        } else {
            console.log("Sign in failed");
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
        
        <section className="grid text-center lg:mt-[-10rem] lg:mb-[-6rem] h-screen items-center p-8 dark:bg-gradient-to-b dark:from-orange-800/10 dark:to-gray-800">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2 text-slate-500">
                    Sign In
                </Typography>
                <Typography className="mb-16 text-gray font-normal text-[18px]">
                    Enter your user name and password to sign in
                </Typography>
                <form onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="username">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                User Name
                            </Typography>
                        </label>
                        <Input
                            onChange={handleChange}
                            id="username"
                            color="gray"
                            size="lg"
                            type="text"
                            name="username"
                            placeholder="user name"
                            className="w-full placeholder:opacity-100 focus:border-t-primary text-gray-900 border-t-blue-gray-200 dark:focus:border-orange-300"
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Password
                            </Typography>
                        </label>
                        <Input
                            id="password"
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
                    </div>
                    <Button type="submit" color="gray" size="lg" className="mt-6 mt-4 w-full rounded-md bg-gray-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none dark:bg-orange-800/30 dark:text-white" fullWidth>
                        sign in
                    </Button>
                    <div className="!mt-4 flex justify-end">
                        <Typography
                            as="a"
                            href="/forgot-password"
                            variant="small"
                            className="font-medium text-gray-900"
                        >
                            Forgot password
                        </Typography>
                    </div>
                    {/* <Button
                        variant="outlined"
                        size="lg"
                        className="mt-6 flex h-12 items-center justify-center gap-2"
                        fullWidth
                    >
                        <img
                            src={`https://www.material-tailwind.com/logos/logo-google.png`}
                            alt="google"
                            className="h-6 w-6"
                        />{" "}
                        sign in with google
                    </Button> */}
                    <Typography
                        variant="small"
                        color="gray"
                        className="!mt-4 text-center font-normal text-gray-900"
                    >
                        Not registered?{" "}
                        <Link to={`${local_url}/sign-up`} className="font-medium text-orange-300">
                            Create account
                        </Link>
                    </Typography>
                </form>
            </div>
        </section>
    );
}

export default SignInForm;