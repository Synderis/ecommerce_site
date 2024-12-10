import { api_url } from "../utils/utils";

export const Logout = async () => {
    const url = `${api_url}/auth/logout`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData.data;
};


export const Login = async ( formData: any ) => {
    const url = `${api_url}/auth/login`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData.data;
};

export const MyInfo = async () => {
    console.log(api_url);
    const url = `${api_url}/me/info`;
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

export const SignUp = async ( formData: any ) => {
    const url = `${api_url}/auth/signup`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
};

export const UserForgotPassword = async ( email: string ) => {
    const url = new URL(`${api_url}/auth/forgot-password/${email}`);
    const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
};

export const UserPasswordReset = async ( formData: any ) => {
    const response = await fetch(`${api_url}/auth/reset-password/${formData.reset_token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
};