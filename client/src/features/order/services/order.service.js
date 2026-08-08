import api from "../../../services/api";

export const getOrders = async () => {

    const response = await api.get(
        "/orders"
    );

    return response.data;

};

export const getOrder = async (id) => {

    const response = await api.get(
        `/orders/${id}`
    );

    return response.data;

};

export const cancelOrder = async (id) => {

    const response = await api.patch(
        `/orders/${id}/cancel`
    );

    return response.data;

};