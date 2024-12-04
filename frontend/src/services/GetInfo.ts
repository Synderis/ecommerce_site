// import { useState } from "react";
// import { token } from "../utils/utils";
import { api_url } from "../utils/utils";


export const MyInfo = async () => {
    // const token = localStorage.getItem("token");
    // console.log(token);
    console.log(api_url);
    const url = `${api_url}/me/info`;
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