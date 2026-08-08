import api from "../../../services/api";

export const registerUser = async (data) => {

    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;

};

export const loginUser = async (data) => {

    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;

};

export const logoutUser = async () => {

    const response = await api.post(
        "/auth/logout"
    );

    return response.data;

};

export const getProfile = async () => {

    const response = await api.get(
        "/auth/profile"
    );

    return response.data;

};

export const updateProfile = async (
    data
) => {

    const response =
        await api.put(
            "/auth/profile",
            data
        );

    return response.data;

};


export const changePassword = async (
    data
) => {

    const response =
        await api.put(
            "/auth/change-password",
            data
        );

    return response.data;

};


export const forgotPassword = async (
    email
) => {

    const response =
        await api.post(
            "/auth/forgot-password",
            {
                email
            }
        );

    return response.data;

};


export const resetPassword = async (
    token,
    password
) => {

    const response =
        await api.post(
            `/auth/reset-password/${token}`,
            {
                password
            }
        );

    return response.data;

};