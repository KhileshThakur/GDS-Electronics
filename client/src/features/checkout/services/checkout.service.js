import api from "../../../services/api";

export const createOrder = async (data) => {
    const response = await api.post(
        "/orders",
        data
    );

    return response.data;
};

export const createRazorpayOrder = async (data) => {
    const response = await api.post(
        "/orders/razorpay/create",
        data
    );

    return response.data;
};

export const verifyRazorpayPayment = async (data) => {
    const response = await api.post(
        "/orders/razorpay/verify",
        data
    );

    return response.data;
};