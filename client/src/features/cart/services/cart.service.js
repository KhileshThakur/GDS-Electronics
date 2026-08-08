import api from "../../../services/api";

export const getCart = async () => {

    const response = await api.get(
        "/cart"
    );

    return response.data;

};

export const addToCart = async (data) => {

    const response = await api.post(
        "/cart",
        data
    );

    return response.data;

};

export const updateCartItem = async (
    itemId,
    quantity
) => {

    const response = await api.put(
        `/cart/${itemId}`,
        {
            quantity
        }
    );

    return response.data;

};

export const removeCartItem = async (
    itemId
) => {

    const response = await api.delete(
        `/cart/${itemId}`
    );

    return response.data;

};

export const clearCart = async () => {

    const response = await api.delete(
        "/cart"
    );

    return response.data;

};