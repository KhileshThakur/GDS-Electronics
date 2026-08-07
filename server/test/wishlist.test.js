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

    section("❤️ WISHLIST TEST SUITE");

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
                    name: "Wishlist Test Category"
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

                    name: "Wishlist Product",

                    category: storage.categoryId,

                    brand: "Generic",

                    shortDescription:
                        "Wishlist Product",

                    description:
                        "Wishlist Product",

                    price: 100,

                    discountPrice: 80,

                    stock: 10,

                    sku: "WISH001",

                    hasVariants: false

                }
            );

            expectStatus(
                response,
                201
            );

            storage.productId =
                response.data.data._id;

            expect(
                storage.productId,
                "Product ID missing"
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
    // Get Empty Wishlist
    // ======================================

    await test(
        "Get Empty Wishlist",
        async () => {

            const response =
                await client.get(
                    "/wishlist"
                );

            expectStatus(response, 200);

            expect(
                response.data.data.products.length === 0,
                "Wishlist should be empty"
            );

        }
    );

    // ======================================
    // Add Product
    // ======================================

    await test(
        "Add Product",
        async () => {

            const response =
                await client.post(
                    "/wishlist",
                    {
                        product:
                            storage.productId
                    }
                );

            expectStatus(response, 200);

            expect(
                response.data.data.products.length === 1,
                "Product not added"
            );

        }
    );

    // ======================================
    // Duplicate Product
    // ======================================

    await test(
        "Duplicate Product",
        async () => {

            const response =
                await client.post(
                    "/wishlist",
                    {
                        product:
                            storage.productId
                    }
                );

            expectStatus(
                response,
                409
            );

        }
    );

    // ======================================
    // Verify Wishlist
    // ======================================

    await test(
        "Verify Wishlist",
        async () => {

            const response =
                await client.get(
                    "/wishlist"
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.products.length === 1,
                "Wishlist should contain one product"
            );

            expect(
                response.data.data.products[0]._id ===
                storage.productId,
                "Wrong product returned"
            );

        }
    );

    // ======================================
    // Remove Product
    // ======================================

    await test(
        "Remove Product",
        async () => {

            const response =
                await client.delete(
                    `/wishlist/${storage.productId}`
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.products.length === 0,
                "Product not removed"
            );

        }
    );

    // ======================================
    // Clear Wishlist
    // ======================================

    await test(
        "Clear Wishlist",
        async () => {

            const response =
                await client.delete(
                    "/wishlist"
                );

            expectStatus(
                response,
                200
            );

        }
    );

    // ======================================
    // Verify Empty Wishlist
    // ======================================

    await test(
        "Verify Empty Wishlist",
        async () => {

            const response =
                await client.get(
                    "/wishlist"
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.products.length === 0,
                "Wishlist should be empty"
            );

        }
    );

    // ======================================
    // Admin Login Cleanup
    // ======================================

    await test(
        "Admin Login Cleanup",
        async () => {

            const response =
                await client.post(
                    "/auth/login",
                    {
                        email: config.admin.email,
                        password: config.admin.password
                    }
                );

            expectStatus(
                response,
                200
            );

        }
    );

    // ======================================
    // Delete Product
    // ======================================

    await test(
        "Delete Product",
        async () => {

            const response =
                await client.delete(
                    `/products/${storage.productId}`
                );

            expectStatus(
                response,
                200
            );

        }
    );

    // ======================================
    // Delete Category
    // ======================================

    await test(
        "Delete Category",
        async () => {

            const response =
                await client.delete(
                    `/categories/${storage.categoryId}`
                );

            expectStatus(
                response,
                200
            );

        }
    );

    summary();

};

run();