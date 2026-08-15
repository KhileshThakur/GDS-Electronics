import Product from "../models/Product.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

const LOW_STOCK_THRESHOLD = 5;


// =====================================================
// Helper: Get total stock
// =====================================================

const getTotalStock = (product) => {

    if (product.hasVariants && product.variants?.length) {

        return product.variants.reduce(
            (total, variant) =>
                total + Number(variant.stock || 0),
            0
        );

    }

    return Number(product.stock || 0);
};


// =====================================================
// Helper: Get stock status
// =====================================================

const getStockStatus = (stock) => {

    if (stock === 0) {
        return "OUT_OF_STOCK";
    }

    if (stock <= LOW_STOCK_THRESHOLD) {
        return "LOW_STOCK";
    }

    return "IN_STOCK";
};


// =====================================================
// Get Inventory
// =====================================================

export const getInventory = asyncHandler(
    async (req, res) => {

        const {
            search = "",
            category = "",
            stockStatus = ""
        } = req.query;

        const filter = {};

        // -------------------------
        // Search
        // -------------------------

        const searchText = search.trim();

        if (searchText) {

            const searchWords = searchText
                .split(/\s+/)
                .filter(Boolean);

            filter.$and = searchWords.map(
                word => {

                    const escapedWord =
                        word.replace(
                            /[.*+?^${}()|[\]\\]/g,
                            "\\$&"
                        );

                    const regex = new RegExp(
                        escapedWord,
                        "i"
                    );

                    return {
                        $or: [
                            {
                                name: regex
                            },
                            {
                                brand: regex
                            },
                            {
                                sku: regex
                            },
                            {
                                "variants.name": regex
                            },
                            {
                                "variants.sku": regex
                            }
                        ]
                    };

                }
            );

        }

        // -------------------------
        // Category
        // -------------------------

        if (category) {
            filter.category = category;
        }

        const products = await Product.find(filter)
            .populate(
                "category",
                "name slug"
            )
            .sort({
                createdAt: -1
            });

        // -------------------------
        // Format inventory
        // -------------------------

        let inventory = products.map(
            product => {

                const totalStock =
                    getTotalStock(product);

                return {
                    _id: product._id,

                    name: product.name,

                    brand: product.brand,

                    images: product.images,

                    category: product.category,

                    hasVariants:
                        product.hasVariants,

                    sku:
                        product.hasVariants
                            ? null
                            : product.sku,

                    stock:
                        product.hasVariants
                            ? totalStock
                            : product.stock,

                    totalStock,

                    status:
                        getStockStatus(
                            totalStock
                        ),

                    productStatus:
                        product.status,

                    price:
                        product.discountPrice > 0
                            ? product.discountPrice
                            : product.price,

                    isFeatured:
                        product.isFeatured,

                    variants:
                        product.hasVariants
                            ? product.variants.map(
                                variant => ({
                                    _id: variant._id,
                                    name: variant.name,
                                    sku: variant.sku,
                                    price: variant.price,
                                    discountPrice:
                                        variant.discountPrice,
                                    stock: variant.stock,
                                    status:
                                        getStockStatus(
                                            Number(
                                                variant.stock || 0
                                            )
                                        ),
                                    attributes:
                                        variant.attributes
                                })
                            )
                            : []
                };

            }
        );

        // -------------------------
        // Stock status filter
        // -------------------------

        if (stockStatus) {

            inventory = inventory.filter(
                item =>
                    item.status === stockStatus
            );

        }

        return sendResponse(
            res,
            200,
            true,
            "Inventory fetched successfully",
            inventory
        );

    }
);


// =====================================================
// Inventory Summary
// =====================================================

export const getInventorySummary =
    asyncHandler(
        async (req, res) => {

            const products =
                await Product.find({});

            let totalProducts =
                products.length;

            let totalUnits = 0;

            let inStock = 0;
            let lowStock = 0;
            let outOfStock = 0;

            for (const product of products) {

                const stock =
                    getTotalStock(product);

                totalUnits += stock;

                const status =
                    getStockStatus(stock);

                if (status === "IN_STOCK") {
                    inStock++;
                }

                else if (
                    status === "LOW_STOCK"
                ) {
                    lowStock++;
                }

                else {
                    outOfStock++;
                }

            }

            return sendResponse(
                res,
                200,
                true,
                "Inventory summary fetched successfully",
                {
                    totalProducts,
                    totalUnits,
                    inStock,
                    lowStock,
                    outOfStock
                }
            );

        }
    );


// =====================================================
// Get Single Inventory Product
// =====================================================

export const getInventoryProduct =
    asyncHandler(
        async (req, res) => {

            const { id } = req.params;

            const product =
                await Product.findById(id)
                    .populate(
                        "category",
                        "name slug"
                    );

            if (!product) {

                return sendResponse(
                    res,
                    404,
                    false,
                    "Product not found"
                );

            }

            const totalStock =
                getTotalStock(product);

            const inventory = {

                _id: product._id,

                name: product.name,

                brand: product.brand,

                images: product.images,

                category: product.category,

                hasVariants:
                    product.hasVariants,

                sku:
                    product.hasVariants
                        ? null
                        : product.sku,

                stock:
                    product.hasVariants
                        ? totalStock
                        : product.stock,

                totalStock,

                status:
                    getStockStatus(
                        totalStock
                    ),

                productStatus:
                    product.status,

                price: product.price,

                discountPrice:
                    product.discountPrice,

                variants:
                    product.hasVariants
                        ? product.variants.map(
                            variant => ({
                                _id: variant._id,
                                name: variant.name,
                                sku: variant.sku,
                                price: variant.price,
                                discountPrice:
                                    variant.discountPrice,
                                stock: variant.stock,
                                status:
                                    getStockStatus(
                                        Number(
                                            variant.stock || 0
                                        )
                                    ),
                                attributes:
                                    variant.attributes
                            })
                        )
                        : []

            };

            return sendResponse(
                res,
                200,
                true,
                "Inventory product fetched successfully",
                inventory
            );

        }
    );


// =====================================================
// Update Product Stock
// =====================================================

export const updateStock =
    asyncHandler(
        async (req, res) => {

            const { id } = req.params;

            const { stock } = req.body;

            // -------------------------
            // Validate
            // -------------------------

            if (
                stock === undefined ||
                stock === null ||
                Number.isNaN(Number(stock)) ||
                Number(stock) < 0
            ) {

                return sendResponse(
                    res,
                    400,
                    false,
                    "Valid stock value is required"
                );

            }

            const product =
                await Product.findById(id);

            if (!product) {

                return sendResponse(
                    res,
                    404,
                    false,
                    "Product not found"
                );

            }

            // -------------------------
            // Variant products
            // -------------------------

            if (product.hasVariants) {

                return sendResponse(
                    res,
                    400,
                    false,
                    "Stock must be updated through a variant"
                );

            }

            product.stock =
                Number(stock);

            await product.save();

            return sendResponse(
                res,
                200,
                true,
                "Stock updated successfully",
                {
                    productId: product._id,
                    stock: product.stock,
                    status:
                        getStockStatus(
                            product.stock
                        )
                }
            );

        }
    );


// =====================================================
// Update Variant Stock
// =====================================================

export const updateVariantStock =
    asyncHandler(
        async (req, res) => {

            const {
                id,
                variantId
            } = req.params;

            const { stock } = req.body;

            // -------------------------
            // Validate
            // -------------------------

            if (
                stock === undefined ||
                stock === null ||
                Number.isNaN(Number(stock)) ||
                Number(stock) < 0
            ) {

                return sendResponse(
                    res,
                    400,
                    false,
                    "Valid stock value is required"
                );

            }

            const product =
                await Product.findById(id);

            if (!product) {

                return sendResponse(
                    res,
                    404,
                    false,
                    "Product not found"
                );

            }

            if (!product.hasVariants) {

                return sendResponse(
                    res,
                    400,
                    false,
                    "Product does not have variants"
                );

            }

            const variant =
                product.variants.id(
                    variantId
                );

            if (!variant) {

                return sendResponse(
                    res,
                    404,
                    false,
                    "Variant not found"
                );

            }

            variant.stock =
                Number(stock);

            await product.save();

            return sendResponse(
                res,
                200,
                true,
                "Variant stock updated successfully",
                {
                    productId: product._id,

                    variantId:
                        variant._id,

                    stock:
                        variant.stock,

                    status:
                        getStockStatus(
                            variant.stock
                        )
                }
            );

        }
    );