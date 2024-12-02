export const MyProduct = async ( product_id: number ) => {
    // console.log(token);
    // const product_id = 1;
    const url = `${window.location.protocol}//${window.location.hostname}${window.location.hostname === 'localhost' ? ':8000' : ''}/products/${product_id}`;
    const response = await fetch(url, {
        method: "GET",
        // headers: {
        //     Authorization: "Bearer " + localStorage.getItem("token"),
        // },
        // body: JSON.stringify(payload)
    });
    const responseData = await response.json();
    console.log(responseData);
    // return responseData.data.carts[0];
    return responseData.data;
};