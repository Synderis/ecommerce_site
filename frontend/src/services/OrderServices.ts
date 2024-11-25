export const MyOrders = async () => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/orders/", {
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

export const OrderItems = async ( order_id: number ) => {
    // console.log(token);
    const response = await fetch(`http://localhost:8000/orders/${order_id}/items`, {
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

export const CreateOrder = async ( cart_id: number ) => {
    // console.log(token);
    const response = await fetch(`http://localhost:8000/orders/${cart_id}/create`, {
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

export const CreateAddress = async ( address: any ) => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/address/", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(address)
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};

export const UnfinishedOrder = async () => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/orders/current-order", {
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

export const FinishOrder = async ( order_id: number ) => {
    // console.log(token);
    const response = await fetch(`http://localhost:8000/stripe/process-payment/${order_id}`, {
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