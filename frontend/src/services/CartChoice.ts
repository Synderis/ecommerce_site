export const CartChoice = async (product_id: number, quantity: number) => {
    // Get current cart
    const response = await fetch("http://localhost:8000/me/", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    const carts = responseData.data.carts;
    if (carts.length === 0) {
        // Create cart
        const createCartResponse = await fetch("http://localhost:8000/carts/", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product_id,
                quantity,
            }),
        });
        const createCartData = await createCartResponse.json();
        console.log(createCartData);
        return;
    } else {
        const currentCartId = carts[0].id;

        // Add product to cart
        const addProductResponse = await fetch(`http://localhost:8000/carts/${currentCartId}/add/`, {
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