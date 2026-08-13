import api from "../../../services/api";

// ======================
// Get All Products
// ======================
export const getProducts = async (params = {}) => {

    const response = await api.get(
        "/products",
        {
            params
        }
    );

    return response.data;

};

// ======================
// Get Single Product
// ======================

export const getProduct = async (slug) => {

    const response = await api.get(
        `/products/${slug}`
    );

    return response.data;

};
