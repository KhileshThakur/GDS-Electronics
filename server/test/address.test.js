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

    section("🏠 ADDRESS TEST SUITE");

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
    // Get Empty Address List
    // ======================================

    await test(
        "Get Empty Address List",
        async () => {

            const response =
                await client.get("/addresses");

            expectStatus(response, 200);

            expect(
                response.data.data.length === 0,
                "Address list should be empty"
            );

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
                            "Near Temple",

                        landmark:
                            "Bus Stop",

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

            expect(
                storage.addressId,
                "Address ID missing"
            );

        }
    );

        // ======================================
    // Get Addresses
    // ======================================

    await test(
        "Get Addresses",
        async () => {

            const response =
                await client.get(
                    "/addresses"
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.length === 1,
                "Address not created"
            );

        }
    );

        // ======================================
    // Get Single Address
    // ======================================

    await test(
        "Get Single Address",
        async () => {

            const response =
                await client.get(
                    `/addresses/${storage.addressId}`
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data._id ===
                storage.addressId,
                "Wrong address returned"
            );

        }
    );

        // ======================================
    // Update Address
    // ======================================

    await test(
        "Update Address",
        async () => {

            const response =
                await client.put(
                    `/addresses/${storage.addressId}`,
                    {

                        fullName:
                            "Khilesh N. Thakur",

                        mobile:
                            "9999999999",

                        addressLine1:
                            "Flat 202",

                        addressLine2:
                            "Near Mall",

                        landmark:
                            "Signal",

                        city:
                            "Pune",

                        state:
                            "Maharashtra",

                        country:
                            "India",

                        pincode:
                            "411002",

                        type:
                            "office"

                    }
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.fullName ===
                "Khilesh N. Thakur",
                "Address not updated"
            );

        }
    );

        // ======================================
    // Create Second Address
    // ======================================

    await test(
        "Create Second Address",
        async () => {

            const response =
                await client.post(
                    "/addresses",
                    {

                        fullName:
                            "Khilesh Thakur",

                        mobile:
                            "8888888888",

                        addressLine1:
                            "Flat 303",

                        addressLine2:
                            "",

                        landmark:
                            "",

                        city:
                            "Mumbai",

                        state:
                            "Maharashtra",

                        country:
                            "India",

                        pincode:
                            "400001",

                        type:
                            "home"

                    }
                );

            expectStatus(
                response,
                201
            );

            storage.secondAddressId =
                response.data.data._id;

            expect(
                storage.secondAddressId,
                "Second Address ID missing"
            );

        }
    );

        // ======================================
    // Set Default Address
    // ======================================

    await test(
        "Set Default Address",
        async () => {

            const response =
                await client.patch(
                    `/addresses/${storage.secondAddressId}/default`
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.isDefault === true,
                "Default address not updated"
            );

        }
    );

        // ======================================
    // Verify Default Address
    // ======================================

    await test(
        "Verify Default Address",
        async () => {

            const response =
                await client.get(
                    "/addresses"
                );

            expectStatus(
                response,
                200
            );

            const defaultAddress =
                response.data.data.find(
                    address => address.isDefault
                );

            expect(
                defaultAddress._id ===
                storage.secondAddressId,
                "Wrong default address"
            );

        }
    );

        // ======================================
    // Delete Default Address
    // ======================================

    await test(
        "Delete Default Address",
        async () => {

            const response =
                await client.delete(
                    `/addresses/${storage.secondAddressId}`
                );

            expectStatus(
                response,
                200
            );

        }
    );

        // ======================================
    // Verify Default Switched
    // ======================================

    await test(
        "Verify Default Switched",
        async () => {

            const response =
                await client.get(
                    "/addresses"
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.length === 1,
                "Wrong address count"
            );

            expect(
                response.data.data[0]._id ===
                storage.addressId,
                "Wrong address remaining"
            );

            expect(
                response.data.data[0].isDefault === true,
                "Default not switched"
            );

        }
    );

        // ======================================
    // Delete Remaining Address
    // ======================================

    await test(
        "Delete Remaining Address",
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
    // Verify Empty Address List
    // ======================================

    await test(
        "Verify Empty Address List",
        async () => {

            const response =
                await client.get(
                    "/addresses"
                );

            expectStatus(
                response,
                200
            );

            expect(
                response.data.data.length === 0,
                "Address list should be empty"
            );

        }
    );

        summary();

};

run();