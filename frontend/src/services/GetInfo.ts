// import { useState } from "react";
// import { token } from "../utils/utils";


export const MyInfo = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/me`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};