export const DeactivateProduct = async ( product_id: number ) => {
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