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

    section("📦 ORDER TEST SUITE");

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
                    name: "Order Test Category"
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

                    name: "Order Product",

                    category:
                        storage.categoryId,

                    brand: "Generic",

                    shortDescription:
                        "Order Product",

                    description:
                        "Order Product",

                    price: 100,

                    discountPrice: 80,

                    stock: 10,

                    sku: "ORDER001",

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
    // Create Address
    // ======================================

    await test(
        "Create Address",
        async () => {

            const response =
                await client.post(
                    "/addresses",
                    {

                        fullName:
                            "Khilesh Thakur",

                        mobile:
                            "9876543210",

                        addressLine1:
                            "Flat 101",

                        addressLine2:
                            "",

                        landmark:
                            "",

                        city:
                            "Pune",

                        state:
                            "Maharashtra",

                        country:
                            "India",

                        pincode:
                            "411001",

                        type:
                            "home"

                    }
                );

            expectStatus(
                response,
                201
            );

            storage.addressId =
                response.data.data._id;

        }
    );

    // ======================================
    // Add Product To Cart
    // ======================================

    await test(
        "Add Product To Cart",
        async () => {

            const response =
                await client.post(
                    "/cart",
                    {

                        product:
                            storage.productId,

                        quantity: 2

                    }
                );

            expectStatus(
                response,
                200
            );

        }
    );

    // ======================================
    // Create Order
    // ======================================

    await test(
        "Create Order",
        async () => {

            const response =
                await client.post(
                    "/orders",
                    {

                        addressId:
                            storage.addressId,

                        paymentMethod:
                            "COD"

                    }
                );

            expectStatus(
                response,
                201
            );

            storage.orderId =
                response.data.data._id;

            expect(
                storage.orderId,
                "Order ID missing"
            );

            expect(
                response.data.data.items.length === 1,
                "Order items missing"
            );

        }
    );

    // ======================================
    // Get Orders
    // ======================================

    await test(
        "Get Orders",
        async () => {
            const response = await client.get("/orders");
            expectStatus(response, 200);
        }
    );

    // ======================================
    // Get Single Order
    // ======================================

    await test(
        "Get Single Order",
        async () => {

            const response =
                await client.get(
                    `/orders/${storage.orderId}`
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data._id ===
                storage.orderId,
                "Wrong order returned"
            );

        }
    );

    // ======================================
    // Verify Cart Cleared
    // ======================================

    await test(
        "Verify Cart Cleared",
        async () => {

            const response =
                await client.get(
                    "/cart"
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.items.length === 0,
                "Cart was not cleared"
            );

        }
    );

    // ======================================
    // Verify Product Stock Reduced
    // ======================================

    await test(
        "Verify Product Stock Reduced",
        async () => {

            const response =
                await client.get(
                    "/products"
                );

            expectStatus(
                response,
                200
            );

            const product =
                response.data.data.find(
                    product =>
                        product._id ===
                        storage.productId
                );

            expect(
                product,
                "Product not found"
            );

            expect(
                product.stock === 8,
                "Stock was not reduced"
            );

        }
    );

    // ======================================
    // Cancel Order
    // ======================================

    await test(
        "Cancel Order",
        async () => {

            const response =
                await client.patch(
                    `/orders/${storage.orderId}/cancel`
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.status ===
                "Cancelled",
                "Order was not cancelled"
            );

        }
    );

    // ======================================
    // Verify Product Stock Restored
    // ======================================

    await test(
        "Verify Product Stock Restored",
        async () => {

            const response =
                await client.get(
                    "/products"
                );

            expectStatus(
                response,
                200
            );

            const product =
                response.data.data.find(
                    product =>
                        product._id ===
                        storage.productId
                );

            expect(
                product,
                "Product not found"
            );

            expect(
                product.stock === 10,
                "Stock was not restored"
            );

        }
    );


    // ======================================
    // Delete Address
    // ======================================

    await test(
        "Delete Address",
        async () => {

            const response =
                await client.delete(
                    `/addresses/${storage.addressId}`
                );

            expectStatus(
                response,
                200
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