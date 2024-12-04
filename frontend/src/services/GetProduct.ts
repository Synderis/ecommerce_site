import { api_url } from "../utils/utils";

export const MyProduct = async ( product_id: number ) => {
    // console.log(token);
    // const product_id = 1;
    const url = `${api_url}/products/${product_id}`;
    const response = await fetch(url, {
        method: "GET",
        // headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token"),
        // },
        // body: JSON.stringify(payload)
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};