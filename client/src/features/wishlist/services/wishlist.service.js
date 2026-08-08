import api from "../../../services/api";

console.log(
    "WISHLIST API:",
    api.defaults.baseURL
);

export const getWishlist = async () => {

    const response = await api.get(
        "/wishlist"
    );

    return response.data;

};

export const addToWishlist = async (
    product
) => {

    const response = await api.post(
        "/wishlist",
        {
            product
        }
    );

    return response.data;

};

export const removeFromWishlist = async (
    productId
) => {

    const response = await api.delete(
        `/wishlist/${productId}`
    );

    return response.data;

};

export const clearWishlist = async () => {

    const response = await api.delete(
        "/wishlist"
    );

    return response.data;

};