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


/* =========================================
   ADMIN ORDERS
========================================= */

export const getAdminOrders = async (params = {}) => {

    const response = await api.get(
        "/orders/admin",
        {
            params
        }
    );

    return response.data;
};


export const getAdminOrder = async (id) => {

    const response = await api.get(
        `/orders/admin/${id}`
    );

    return response.data;
};


export const updateAdminOrderStatus = async (
    id,
    data
) => {

    const response = await api.patch(
        `/orders/admin/${id}/status`,
        data
    );

    return response.data;
};