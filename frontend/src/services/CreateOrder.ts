export const MyOrder = async ( cart_id: number ) => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/orders/", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
            "cart_id": cart_id
        })
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};