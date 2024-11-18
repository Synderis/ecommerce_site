export const UpdateCart = async (cart_id: number, updatedCartItems: any) => {
    // const updatedCartItems = cart.cart_items.filter((item) => item.product.id !== product_id);
    
    // const updatedCart = { ...cart, cart_items: updatedCartItems };
    // setCart(updatedCart);
    const payload = {
        "cart_items": updatedCartItems,
    }
    const url = window.location.host === "localhost:3000" ? `http://localhost:8000/carts/${cart_id}` : `https://.com/`;;
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