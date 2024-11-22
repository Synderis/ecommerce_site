export const AllUsers = async () => {
    // console.log(token);
    const response = await fetch("http://localhost:8000/users/?page=1&limit=10&role=user", {
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