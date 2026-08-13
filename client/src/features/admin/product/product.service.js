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

// ======================
// Create Product
// ======================
export const createProduct = async (data) => {

    const response = await api.post(
        "/products",
        data
    );

    return response.data;

};

// ======================
// Update Product
// ======================

export const updateProduct = async (
    id,
    data
) => {

    const response = await api.put(
        `/products/${id}`,
        data
    );

    return response.data;

};

// ======================
// Delete Product
// ======================

export const deleteProduct = async (id) => {

    const response = await api.delete(
        `/products/${id}`
    );

    return response.data;

};

// ======================
// Related Products
// ======================

export const getRelatedProducts = async (id) => {

    const response = await api.get(
        `/products/related/${id}`
    );

    return response.data;

};

// ======================
// Get Product By Id
// ======================


export const getProductById = async (id) => {

    const response = await api.get(
        `/products/id/${id}`
    );

    return response.data;

};