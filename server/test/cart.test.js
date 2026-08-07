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
    expectStatus
} from "./helpers/assertions.js";



const run = async () => {

    section("🛒 CART TEST SUITE");

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
                    name: "Cart Test Category"
                }
            );

            expectStatus(response, 201);

            storage.categoryId =
                response.data.data._id;

            expect(
                storage.categoryId,
                "Category ID missing"
            );

        }
    );

    // ======================================
    // Create Product
    // ======================================

    await test(
        "Create Product",
        async () => {

            const response = await client.post(
                "/products",
                {

                    name: "Cart Test Product",

                    category:
                        storage.categoryId,

                    brand: "Test Brand",

                    shortDescription:
                        "Short Description",

                    description:
                        "Description",

                    price: 100,

                    discountPrice: 80,

                    stock: 10,

                    sku: "CART001",

                    hasVariants: false

                }
            );

            expectStatus(response, 201);

            storage.productId =
                response.data.data._id;

            expect(
                storage.productId,
                "Product ID missing"
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

                    name: "Variant Product",

                    category:
                        storage.categoryId,

                    brand: "Generic",

                    shortDescription:
                        "Variant Product",

                    description:
                        "Variant Product",

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
                        }

                    ]

                }
            );

            expectStatus(response, 201);

            storage.variantProductId =
                response.data.data._id;

            expect(
                storage.variantProductId,
                "Variant Product ID missing"
            );

        }
    );


    // ======================================
    // User Login
    // ======================================

    await test(
        "User Login",
        async () => {

            const response = await client.post(
                "/auth/login",
                {
                    email: config.user.email,
                    password: config.user.password
                }
            );

            expectStatus(response, 200);

        }
    );

    // ======================================
    // Get Empty Cart
    // ======================================

    await test(
        "Get Empty Cart",
        async () => {

            const response = await client.get(
                "/cart"
            );

            expectStatus(response, 200);

            expect(
                response.data.data.items.length === 0,
                "Cart should be empty"
            );

        }
    );

    // ======================================
    // Add Product To Cart
    // ======================================

    await test(
        "Add Product",
        async () => {

            const response = await client.post(
                "/cart",
                {
                    product: storage.productId,
                    quantity: 2
                }
            );

            expectStatus(response, 200);

            expect(
                response.data.data.items.length === 1,
                "Product not added"
            );

            storage.cartItemId =
                response.data.data.items[0]._id;

            expect(
                storage.cartItemId,
                "Cart Item ID missing"
            );

        }
    );

    // ======================================
    // Verify Cart
    // ======================================

    await test(
        "Verify Cart",
        async () => {

            const response = await client.get(
                "/cart"
            );

            expectStatus(response, 200);

            expect(
                response.data.data.items.length === 1,
                "Cart should contain one item"
            );

            expect(
                response.data.data.items[0].quantity === 2,
                "Wrong quantity"
            );

        }
    );

    // ======================================
    // Increase Quantity
    // ======================================

    await test(
        "Increase Quantity",
        async () => {

            const response = await client.put(
                `/cart/${storage.cartItemId}`,
                {
                    quantity: 5
                }
            );

            expectStatus(response, 200);

            expect(
                response.data.data.items[0].quantity === 5,
                "Quantity update failed"
            );

        }
    );

    // ======================================
    // Add Variant Product To Cart
    // ======================================

    await test(
        "Add Variant Product",
        async () => {

            const response = await client.post(
                "/cart",
                {
                    product: storage.variantProductId,
                    variantSku: "RES220",
                    quantity: 2
                }
            );

            expectStatus(response, 200);

            expect(
                response.data.data.items.length === 2,
                "Variant product not added"
            );

            const variantItem =
                response.data.data.items.find(
                    item =>
                        item.product._id ===
                        storage.variantProductId
                );

            storage.variantCartItemId =
                variantItem._id;

            expect(
                storage.variantCartItemId,
                "Variant Cart Item ID missing"
            );

        }
    );

    // ======================================
    // Remove Product
    // ======================================

    await test(
        "Remove Product",
        async () => {

            const response = await client.delete(
                `/cart/${storage.cartItemId}`
            );

            expectStatus(response, 200);

            expect(
                response.data.data.items.length === 1,
                "Product not removed"
            );

        }
    );

    // ======================================
    // Clear Cart
    // ======================================

    await test(
        "Clear Cart",
        async () => {

            const response = await client.delete(
                "/cart"
            );

            expectStatus(response, 200);

        }
    );

    // ======================================
    // Verify Empty Cart
    // ======================================

    await test(
        "Verify Empty Cart",
        async () => {

            const response = await client.get(
                "/cart"
            );

            expectStatus(response, 200);

            expect(
                response.data.data.items.length === 0,
                "Cart should be empty"
            );

        }
    );

    // ======================================
    // Admin Login
    // ======================================

    await test(
        "Admin Login Cleanup",
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
    // Delete Variant Product
    // ======================================

    await test(
        "Delete Variant Product",
        async () => {

            const response = await client.delete(
                `/products/${storage.variantProductId}`
            );

            expectStatus(response, 200);

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

            expectStatus(response, 200);

        }
    );

    // ======================================
    // Delete Category
    // ======================================

    await test(
        "Delete Category",
        async () => {

            const response = await client.delete(
                `/categories/${storage.categoryId}`
            );

            expectStatus(response, 200);

        }
    );

    summary();

};

run();