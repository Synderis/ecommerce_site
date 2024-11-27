export const DeactivateProduct = async (product_id: number) => {
    // console.log(token);
    // const product_id = 1;
    const response = await fetch(`http://localhost:8000/products/${product_id}/deactivate`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        // body: JSON.stringify(payload)
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};

export const AllOrders = async () => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/orders/admin-orders", {
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

export const AllUsers = async () => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/users/", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data
};

export const AllProducts = async () => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/products/admin-products", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data
};

export const UpdateProduct = async (product_id: number, payload: any) => {
    // console.log(token);
    console.log(payload);
    const response = await fetch(`http://localhost:8000/products/${product_id}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
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
        const response = await fetch("http://localhost:8000/products/upload", {
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
    const response = await fetch(`http://localhost:8000/products/`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data
};

export const UpdateShippingStatus = async (order_id: number) => {
    // console.log(token);
    const response = await fetch(`http://localhost:8000/orders/${order_id}`, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data
};