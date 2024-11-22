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