import { api_url } from "../utils/utils";
export const ToggleActiveProduct = async (product_id: number) => {

    // const product_id = 1;
    const url =`${api_url}/products/${product_id}/toggle-publish`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        // body: JSON.stringify(payload)
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data;
};

export const AllOrders = async () => {
    const url =`${api_url}/orders/admin-orders`;
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

export const AllOrderItems = async (order_id: number) => {
    const url =`${api_url}/orders/${order_id}/admin-order-items`;
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

export const AllUsers = async () => {
    const url =`${api_url}/users/admin-users`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data
};

export const AllProducts = async () => {
    const url = `${api_url}/products/admin-products`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data
};

export const UpdateProduct = async (product_id: number, payload: any) => {
    console.log(payload);
    const url = `${api_url}/products/${product_id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data
};

export const UploadImage = async (file: any) => {
    const formData = new FormData();
    // formData.append("file", file, file.name);
    formData.append("file", file);
    console.log(formData);
    // const boundary = '---------------------------boundary';
    // const requestBody = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${file.name}"\r\nContent-Type: ${file.type}\r\n\r\n${file}\r\n--${boundary}--`;
    try {
        const url = `${api_url}/products/upload`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                // 'Content-Type': `multipart/form-data; boundary=${boundary}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData);
        return responseData;
        // return
    } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

export const CreateProduct = async ( payload: any ) => {
    console.log(payload);
    const url = `${api_url}/products/create`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data
};

export const UpdateShippingStatus = async (order_id: number) => {
    const url = `${api_url}/orders/${order_id}/update-order`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data
};

export const GetShippingDetails = async (order_id: number) => {
    const url = `${api_url}/address/${order_id}/shipping`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);

    return responseData.data
};