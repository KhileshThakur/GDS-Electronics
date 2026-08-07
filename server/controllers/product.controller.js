import Product from "../models/Product.js";
import Category from "../models/Category.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";
import { validateRequiredFields } from "../utils/validation.js";
import generateSlug from "../utils/slug.js";

export const createProduct = asyncHandler(async (req, res) => {

    let {
        name,
        category,
        brand,
        shortDescription,
        description,
        images,
        hasVariants,
        price,
        discountPrice,
        stock,
        sku,
        variants,
        specifications,
        isFeatured,
        status
    } = req.body;

    // Required Fields

    let error = validateRequiredFields({
        name,
        category,
        brand,
        shortDescription
    });

    if (error) {
        return sendResponse(
            res,
            400,
            false,
            error
        );
    }

    // Sanitize

    name = name.trim();
    brand = brand.trim();
    shortDescription = shortDescription.trim();
    description = description?.trim() || "";

    const slug = generateSlug(name);

    // Category Exists

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
        return sendResponse(
            res,
            404,
            false,
            "Category not found"
        );
    }

    // Duplicate Product

    const existingProduct = await Product.findOne({
        slug
    });

    if (existingProduct) {
        return sendResponse(
            res,
            409,
            false,
            "Product already exists"
        );
    }

    // Product Validation

    if (hasVariants) {
        if (!variants || variants.length === 0) {

            return sendResponse(
                res,
                400,
                false,
                "At least one variant is required"
            );
        }

        for (const variant of variants) {
            error = validateRequiredFields({
                name: variant.name,
                sku: variant.sku,
                price: variant.price
            });

            if (error) {
                return sendResponse(
                    res,
                    400,
                    false,
                    error
                );
            }
        }

        const variantSkus = variants.map(
            variant => variant.sku
        );

        if (new Set(variantSkus).size !== variantSkus.length) {

            return sendResponse(
                res,
                400,
                false,
                "Duplicate variant SKU found"
            );

        }
    }
    else {
        error = validateRequiredFields({
            price,
            sku
        });

        if (error) {
            return sendResponse(
                res,
                400,
                false,
                error
            );
        }

        const existingSku = await Product.findOne({
            sku
        });

        if (existingSku) {
            return sendResponse(
                res,
                409,
                false,
                "SKU already exists"
            );
        }
    }

    // Create Product

    const product = await Product.create({
        name,
        slug,
        category,
        brand,
        shortDescription,
        description,
        images: images || [],
        hasVariants: hasVariants || false,
        price: price || 0,
        discountPrice: discountPrice || 0,
        stock: stock || 0,
        sku: sku || "",
        variants: variants || [],
        specifications: specifications || [],
        isFeatured: isFeatured || false,
        status
    });

    return sendResponse(
        res,
        201,
        true,
        "Product created successfully",
        product
    );
});

export const getProducts = asyncHandler(async (req, res) => {

    const products = await Product.find()
        .populate(
            "category",
            "name slug"
        )
        .sort({
            createdAt: -1
        });

    return sendResponse(
        res,
        200,
        true,
        "Products fetched successfully",
        products
    );
});

export const getProduct = asyncHandler(async (req, res) => {

    const { slug } = req.params;

    const product = await Product.findOne({
        slug
    }).populate(
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

    return sendResponse(
        res,
        200,
        true,
        "Product fetched successfully",
        product
    );

});

export const updateProduct = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
        return sendResponse(
            res,
            404,
            false,
            "Product not found"
        );
    }

    let {
        name,
        category,
        brand,
        shortDescription,
        description,
        images,
        hasVariants,
        price,
        discountPrice,
        stock,
        sku,
        variants,
        specifications,
        isFeatured,
        status
    } = req.body;

    // Required Fields

    let error = validateRequiredFields({
        name,
        category,
        brand,
        shortDescription
    });

    if (error) {
        return sendResponse(
            res,
            400,
            false,
            error
        );
    }

    // Sanitize

    name = name.trim();
    brand = brand.trim();
    shortDescription = shortDescription.trim();
    description = description?.trim() || "";

    const slug = generateSlug(name);

    // Category Exists

    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
        return sendResponse(
            res,
            404,
            false,
            "Category not found"
        );
    }

    // Duplicate Product

    const existingProduct = await Product.findOne({
        _id: { $ne: id },
        slug
    });

    if (existingProduct) {
        return sendResponse(
            res,
            409,
            false,
            "Product already exists"
        );
    }

    // Product Validation

    if (hasVariants) {

        if (!variants || variants.length === 0) {

            return sendResponse(
                res,
                400,
                false,
                "At least one variant is required"
            );

        }

        for (const variant of variants) {

            error = validateRequiredFields({
                name: variant.name,
                sku: variant.sku,
                price: variant.price
            });

            if (error) {

                return sendResponse(
                    res,
                    400,
                    false,
                    error
                );

            }

        }

        const variantSkus = variants.map(
            variant => variant.sku
        );

        if (new Set(variantSkus).size !== variantSkus.length) {

            return sendResponse(
                res,
                400,
                false,
                "Duplicate variant SKU found"
            );

        }

    }
    else {

        error = validateRequiredFields({
            price,
            sku
        });

        if (error) {

            return sendResponse(
                res,
                400,
                false,
                error
            );

        }

        const existingSku = await Product.findOne({
            _id: { $ne: id },
            sku
        });

        if (existingSku) {

            return sendResponse(
                res,
                409,
                false,
                "SKU already exists"
            );

        }

    }

    // Update Product

    product.name = name;
    product.slug = slug;
    product.category = category;
    product.brand = brand;
    product.shortDescription = shortDescription;
    product.description = description;

    product.images = images || [];

    product.hasVariants = hasVariants;

    product.price = price || 0;
    product.discountPrice = discountPrice || 0;
    product.stock = stock || 0;
    product.sku = sku || "";

    product.variants = variants || [];
    product.specifications = specifications || [];

    product.isFeatured = isFeatured ?? product.isFeatured;
    product.status = status ?? product.status;

    await product.save();

    return sendResponse(
        res,
        200,
        true,
        "Product updated successfully",
        product
    );

});

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        return sendResponse(
            res,
            404,
            false,
            "Product not found"
        );

    }
    await product.deleteOne();

    return sendResponse(
        res,
        200,
        true,
        "Product deleted successfully"
    );
});

export const getRelatedProducts = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {

        return sendResponse(
            res,
            404,
            false,
            "Product not found"
        );
    }

    const relatedProducts = await Product.find({
        category: product.category,
        _id: {
            $ne: product._id
        },
        status: "active"
    })
        .limit(4)
        .populate(
            "category",
            "name slug"
        );

    return sendResponse(
        res,
        200,
        true,
        "Related products fetched successfully",
        relatedProducts
    );

});

export const getProductById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const product = await Product.findById(id)
        .populate(
            "category",
            "name"
        );

    if (!product) {

        return sendResponse(
            res,
            404,
            false,
            "Product not found"
        );

    }

    return sendResponse(
        res,
        200,
        true,
        "Product fetched successfully",
        product
    );

});