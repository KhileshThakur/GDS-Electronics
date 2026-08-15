import api from "../../../services/api";


// =====================================================
// Get Inventory
// =====================================================

export const getInventory = async (params = {}) => {

    const response = await api.get(
        "/inventory",
        {
            params
        }
    );

    return response.data;
};


// =====================================================
// Get Inventory Summary
// =====================================================

export const getInventorySummary = async () => {

    const response = await api.get(
        "/inventory/summary"
    );

    return response.data;
};


// =====================================================
// Get Single Inventory Product
// =====================================================

export const getInventoryProduct = async (id) => {

    const response = await api.get(
        `/inventory/${id}`
    );

    return response.data;
};


// =====================================================
// Update Product Stock
// =====================================================

export const updateStock = async (
    id,
    stock
) => {

    const response = await api.patch(
        `/inventory/${id}/stock`,
        {
            stock
        }
    );

    return response.data;
};


// =====================================================
// Update Variant Stock
// =====================================================

export const updateVariantStock = async (
    id,
    variantId,
    stock
) => {

    const response = await api.patch(
        `/inventory/${id}/variant/${variantId}/stock`,
        {
            stock
        }
    );

    return response.data;
};

// ======================
// Update Product Stock
// ======================

export const updateProductStock = async (
    id,
    data
) => {

    const response = await api.patch(
        `/products/${id}/stock`,
        data
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