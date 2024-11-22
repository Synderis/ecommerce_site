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