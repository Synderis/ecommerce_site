export const MyOrders = async () => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/orders/`;
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

export const OrderItems = async ( order_id: number ) => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/orders/${order_id}/items`;
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

export const CreateOrder = async ( cart_id: number ) => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/orders/${cart_id}/create`;
    const response = await fetch(url, {
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
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/address/`;
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
    // return responseData.data.carts[0];
    return responseData.data;
};

export const UnfinishedOrder = async () => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/orders/current-order`;
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

export const FinishOrder = async ( order_id: number ) => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/stripe/process-payment/${order_id}`;
    const response = await fetch(url, {
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

export const ConfirmPayment = async ( order_id: number ) => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/stripe/confirm-payment/${order_id}`;
    const response = await fetch(url, {
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