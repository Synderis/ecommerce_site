// import { useState } from "react";
// import { token } from "../utils/utils";


export const Logout = async () => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/auth/logout", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};

// const url = window.location.host === "localhost:3000" ? `http://localhost:8000/auth/login` : `https://.com/`;
//         const response = await fetch(url, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             body: new URLSearchParams(formData).toString(),
//         });

export const Login = async ( formData: any ) => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};