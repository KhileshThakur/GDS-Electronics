import client from "./helpers/client.js";
import storage from "./helpers/storage.js";
import config from "./helpers/config.js";

import {
    section,
    summary
} from "./helpers/logger.js";

import { test } from "./helpers/test.js";

import {
    expect,
    expectStatus,
    expectArray
} from "./helpers/assertions.js";

const run = async () => {

    section("🚀 PRODUCT TEST SUITE");

    // ======================================
    // Admin Login
    // ======================================

    await test(
        "Admin Login",
        async () => {

            const response = await client.post(
                "/auth/login",
                {
                    email: config.admin.email,
                    password: config.admin.password
                }
            );

            expectStatus(response, 200);

        }
    );

    // ======================================
    // Create Category
    // ======================================

    await test(
        "Create Category",
        async () => {

            const response = await client.post(
                "/categories",
                {
                    name: config.category.name
                }
            );

            expectStatus(response, 201);

            storage.categoryId = response.data.data._id;
            storage.categorySlug = response.data.data.slug;

            expect(
                storage.categoryId,
                "Category ID missing"
            );

        }
    );

    // ======================================
    // Create Simple Product
    // ======================================

    await test(
        "Create Product",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: config.product.name,

                    category: storage.categoryId,

                    brand: config.product.brand,

                    shortDescription:
                        config.product.shortDescription,

                    description:
                        config.product.description,

                    price: config.product.price,

                    discountPrice:
                        config.product.discountPrice,

                    stock: config.product.stock,

                    sku: config.product.sku,

                    hasVariants: false

                }
            );

            expectStatus(
                response,
                201
            );

            storage.productId =
                response.data.data._id;

            storage.productSlug =
                response.data.data.slug;

            expect(
                storage.productId,
                "Product ID missing"
            );

        }
    );

    // ======================================
    // Duplicate Product
    // ======================================

    await test(
        "Duplicate Product",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: config.product.name,

                    category: storage.categoryId,

                    brand: config.product.brand,

                    shortDescription:
                        config.product.shortDescription,

                    description:
                        config.product.description,

                    price: config.product.price,

                    discountPrice:
                        config.product.discountPrice,

                    stock: config.product.stock,

                    sku: "TEST002",

                    hasVariants: false

                }
            );

            expectStatus(
                response,
                409
            );

        }
    );

    // ======================================
    // Duplicate SKU
    // ======================================

    await test(
        "Duplicate SKU",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Another Product",

                    category: storage.categoryId,

                    brand: config.product.brand,

                    shortDescription:
                        config.product.shortDescription,

                    description:
                        config.product.description,

                    price: config.product.price,

                    discountPrice:
                        config.product.discountPrice,

                    stock: config.product.stock,

                    sku: config.product.sku,

                    hasVariants: false

                }
            );

            expectStatus(
                response,
                409
            );

        }
    );

    // ======================================
    // Get Products
    // ======================================

    await test(
        "Get Products",
        async () => {

            const response =
                await client.get(
                    "/products"
                );

            expectStatus(
                response,
                200
            );

            expectArray(
                response.data.data,
                "Products should be an array"
            );

            expect(
                response.data.data.length > 0,
                "Products not found"
            );

        }
    );

    // ======================================
    // Get Single Product
    // ======================================

    await test(
        "Get Product",
        async () => {

            const response =
                await client.get(
                    `/products/${storage.productSlug}`
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data._id ===
                storage.productId,
                "Wrong Product Returned"
            );

        }
    );

    // ======================================
    // Related Products
    // ======================================

    await test(
        "Related Products",
        async () => {

            const response =
                await client.get(
                    `/products/related/${storage.productId}`
                );

            expectStatus(
                response,
                200
            );

            expectArray(
                response.data.data,
                "Related Products should be array"
            );

        }
    );

        // ======================================
    // Update Product
    // ======================================

    await test(
        "Update Product",
        async () => {

            const response = await client.put(
                `/products/${storage.productId}`,
                {

                    name: "Updated Test Product",

                    category: storage.categoryId,

                    brand: "Updated Brand",

                    shortDescription: "Updated Short Description",

                    description: "Updated Description",

                    price: 150,

                    discountPrice: 120,

                    stock: 25,

                    sku: "TEST003",

                    hasVariants: false,

                    isFeatured: true,

                    status: "active"

                }
            );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.name === "Updated Test Product",
                "Product update failed"
            );

        }
    );

    // ======================================
    // Delete Product
    // ======================================

    await test(
        "Delete Product",
        async () => {

            const response = await client.delete(
                `/products/${storage.productId}`
            );

            expectStatus(
                response,
                200
            );

        }
    );

    // ======================================
    // Verify Delete
    // ======================================

    await test(
        "Verify Delete",
        async () => {

            const response = await client.get(
                `/products/${storage.productSlug}`
            );

            expectStatus(
                response,
                404
            );

        }
    );

    // ======================================
    // Create Variant Product
    // ======================================

    await test(
        "Create Variant Product",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: config.variantProduct.name,

                    category: storage.categoryId,

                    brand: config.variantProduct.brand,

                    shortDescription:
                        config.variantProduct.shortDescription,

                    description:
                        config.variantProduct.description,

                    hasVariants: true,

                    variants: [

                        {
                            name: "220 Ohm",

                            sku: "RES220",

                            price: 5,

                            stock: 100,

                            attributes: [

                                {
                                    key: "Resistance",
                                    value: "220Ω"
                                }

                            ]
                        },

                        {
                            name: "330 Ohm",

                            sku: "RES330",

                            price: 5,

                            stock: 120,

                            attributes: [

                                {
                                    key: "Resistance",
                                    value: "330Ω"
                                }

                            ]
                        }

                    ]

                }
            );

            expectStatus(
                response,
                201
            );

            storage.variantProductId =
                response.data.data._id;

            storage.variantProductSlug =
                response.data.data.slug;

        }
    );

    // ======================================
    // Get Variant Product
    // ======================================

    await test(
        "Get Variant Product",
        async () => {

            const response = await client.get(
                `/products/${storage.variantProductSlug}`
            );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.hasVariants,
                "Expected variant product"
            );

            expect(
                response.data.data.variants.length === 2,
                "Expected 2 variants"
            );

        }
    );

    // ======================================
    // Update Variant Product
    // ======================================

    await test(
        "Update Variant Product",
        async () => {

            const response = await client.put(
                `/products/${storage.variantProductId}`,
                {

                    name: config.variantProduct.name,

                    category: storage.categoryId,

                    brand: config.variantProduct.brand,

                    shortDescription:
                        config.variantProduct.shortDescription,

                    description:
                        config.variantProduct.description,

                    hasVariants: true,

                    variants: [

                        {
                            name: "220 Ohm",

                            sku: "RES220",

                            price: 6,

                            stock: 500,

                            attributes: [

                                {
                                    key: "Resistance",
                                    value: "220Ω"
                                }

                            ]
                        },

                        {
                            name: "330 Ohm",

                            sku: "RES330",

                            price: 7,

                            stock: 400,

                            attributes: [

                                {
                                    key: "Resistance",
                                    value: "330Ω"
                                }

                            ]
                        }

                    ],

                    status: "active"

                }
            );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.variants[0].stock === 500,
                "Variant update failed"
            );

        }
    );

    // ======================================
    // Delete Variant Product
    // ======================================

    await test(
        "Delete Variant Product",
        async () => {

            const response = await client.delete(
                `/products/${storage.variantProductId}`
            );

            expectStatus(
                response,
                200
            );

        }
    );

    // ======================================
    // Verify Variant Delete
    // ======================================

    await test(
        "Verify Variant Delete",
        async () => {

            const response = await client.get(
                `/products/${storage.variantProductSlug}`
            );

            expectStatus(
                response,
                404
            );

        }
    );

        // ======================================
    // Invalid Category
    // ======================================

    await test(
        "Invalid Category",
        async () => {

            const response = await client.post(
                "/products",
                {
                    name: "Invalid Category Product",

                    category: "507f1f77bcf86cd799439011",

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    price: 100,

                    sku: "INVALID001",

                    hasVariants: false
                }
            );

            expectStatus(response, 404);

        }
    );

    // ======================================
    // Missing Required Fields
    // ======================================

    await test(
        "Missing Required Fields",
        async () => {

            const response = await client.post(
                "/products",
                {}
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Missing SKU
    // ======================================

    await test(
        "Missing SKU",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Missing SKU",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    price: 100,

                    hasVariants: false

                }
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Missing Price
    // ======================================

    await test(
        "Missing Price",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Missing Price",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    sku: "NOPRICE001",

                    hasVariants: false

                }
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Empty Variant List
    // ======================================

    await test(
        "Empty Variant List",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Variant Product",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    hasVariants: true,

                    variants: []

                }
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Duplicate Variant SKU
    // ======================================

    await test(
        "Duplicate Variant SKU",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Duplicate Variant SKU",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    hasVariants: true,

                    variants: [

                        {
                            name: "220",

                            sku: "DUP001",

                            price: 5
                        },

                        {
                            name: "330",

                            sku: "DUP001",

                            price: 5
                        }

                    ]

                }
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Variant Missing Name
    // ======================================

    await test(
        "Variant Missing Name",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Variant Missing Name",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    hasVariants: true,

                    variants: [

                        {
                            sku: "NAME001",

                            price: 5
                        }

                    ]

                }
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Variant Missing SKU
    // ======================================

    await test(
        "Variant Missing SKU",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Variant Missing SKU",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    hasVariants: true,

                    variants: [

                        {
                            name: "220",

                            price: 5
                        }

                    ]

                }
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Variant Missing Price
    // ======================================

    await test(
        "Variant Missing Price",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Variant Missing Price",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    hasVariants: true,

                    variants: [

                        {
                            name: "220",

                            sku: "PRICE001"
                        }

                    ]

                }
            );

            expectStatus(response, 400);

        }
    );

    // ======================================
    // Discount Price > Price
    // ======================================

    await test(
        "Invalid Discount Price",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Invalid Discount",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    price: 100,

                    discountPrice: 150,

                    stock: 10,

                    sku: "DISC001",

                    hasVariants: false

                }
            );

            expectStatus(response, 500);

        }
    );

    // ======================================
    // Variant Discount > Price
    // ======================================

    await test(
        "Variant Invalid Discount",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Variant Discount",

                    category: storage.categoryId,

                    brand: "Test",

                    shortDescription: "Test",

                    description: "Test",

                    hasVariants: true,

                    variants: [

                        {
                            name: "220",

                            sku: "DISCVAR001",

                            price: 10,

                            discountPrice: 20
                        }

                    ]

                }
            );

            expectStatus(response, 500);

        }
    );

    summary();
};

run();