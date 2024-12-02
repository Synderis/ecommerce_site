export const CartChoice = async (product_id: number, quantity: number) => {
    // Get current cart
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/me`;
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    const carts = responseData.data.carts;
    if (carts.length === 0) {
        // Create cart
        const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/carts`;
        const createCartResponse = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "cart_items": [{
                product_id,
                quantity}],
            }),
        });
        const createCartData = await createCartResponse.json();
        console.log(createCartData);
        return;
    } else {
        const currentCartId = carts[0].id;

        // Add product to cart
        const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/carts/${currentCartId}/add`;
        const addProductResponse = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id,
                quantity,
            }),
        });
        const addProductData = await addProductResponse.json();
        console.log(addProductData);
    }
};

export const MyCarts = async () => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/carts`;
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
}

export const MyActiveCart = async () => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/carts/active`;
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
}

export const MyCart = async ( cart_id: number ) => {
    // console.log(token);
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/carts/${cart_id}`;
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

export const UpdateCart = async (cart_id: number, updatedCartItems: any) => {
    // const updatedCartItems = cart.cart_items.filter((item) => item.product.id !== product_id);
    
    // const updatedCart = { ...cart, cart_items: updatedCartItems };
    // setCart(updatedCart);
    const payload = {
        "cart_items": updatedCartItems,
    }
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/carts/${cart_id}`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log(data);
};