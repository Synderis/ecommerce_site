import { api_url } from "../utils/utils";

export const MyOrders = async () => {
    const url = `${api_url}/orders/user-orders/`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};

export const OrderItems = async ( order_id: number ) => {
    const url = `${api_url}/orders/${order_id}/items`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};

export const CreateOrder = async ( cart_id: number ) => {
    const url = `${api_url}/orders/${cart_id}/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};

export const CreateAddress = async ( address: any ) => {
    const url = `${api_url}/address/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address)
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};

export const UnfinishedOrder = async () => {
    const url = `${api_url}/orders/current-order`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};

export const FinishOrder = async ( order_id: number ) => {
    const url = `${api_url}/stripe/process-payment/${order_id}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};

export const ConfirmPayment = async ( order_id: number ) => {
    const url = `${api_url}/stripe/confirm-payment/${order_id}`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};