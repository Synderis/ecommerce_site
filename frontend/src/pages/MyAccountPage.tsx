import { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { MyCart } from "../services/GetCarts";
import { UserData } from "../utils/types";


const MyAccount = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    // const token = 'Bearer ' + localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await MyCart();
            console.log(response);
            setUserData(response);
        };
        fetchUserData();
    }, []);
    console.log(userData);


    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ marginLeft: '200px', width: '80%', marginTop: '100px'}}>
            <Typography variant="h2" className="mb-4">
                My Account
            </Typography>
            <div className="flex flex-col mb-4">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                    {userData.username}
                </Typography>
                {/* <Input
                    type="text"
                    value={userData.username}
                    readOnly
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                /> */}
            </div>
            <div className="flex flex-col mb-4">
                <Typography variant="small" className="mb-2 block font-medium text-gray-900">
                    {userData.email}
                </Typography>
                {/* <Input
                    type="email"
                    value={userData.email}
                    readOnly
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                /> */}
            </div>
        </div>
    );
}

export default MyAccount;