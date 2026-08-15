import mongoose from "mongoose";

import User from "../models/User.js";
import Order from "../models/Order.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

import {
    ROLES,
    STATUS
} from "../constants/constants.js";


/* =========================================
   GET ALL CUSTOMERS
========================================= */

export const getAdminCustomers = asyncHandler(
    async (req, res) => {

        const {
            search = "",
            status,
            verified,
            page = 1,
            limit = 10
        } = req.query;


        const pageNumber = Math.max(
            Number(page),
            1
        );

        const limitNumber = Math.min(
            Math.max(Number(limit), 1),
            100
        );

        const skip =
            (pageNumber - 1) * limitNumber;


        /* =================================
           QUERY
        ================================= */

        const query = {
            role: ROLES.USER
        };


        /* =================================
           STATUS FILTER
        ================================= */

        if (status) {

            query.status = status;

        }


        /* =================================
           VERIFICATION FILTER
        ================================= */

        if (verified !== undefined) {

            query.isVerified =
                verified === "true";

        }


        /* =================================
           SEARCH
        ================================= */

        if (search.trim()) {

            const regex =
                new RegExp(
                    search.trim(),
                    "i"
                );


            query.$or = [

                {
                    firstName: regex
                },

                {
                    lastName: regex
                },

                {
                    email: regex
                },

                {
                    "phone.number": regex
                }

            ];

        }


        /* =================================
           FETCH
        ================================= */

        const [
            customers,
            total
        ] = await Promise.all([

            User.find(query)

                .select(
                    "-password -__v"
                )

                .sort({
                    createdAt: -1
                })

                .skip(skip)

                .limit(limitNumber)
                .lean(),


            User.countDocuments(query)

        ]);


        /* =================================
           FORMAT
        ================================= */

        const formattedCustomers =
            customers.map(customer => ({

                ...customer,

                name:
                    `${customer.firstName || ""} ${customer.lastName || ""}`
                        .trim(),

                mobile:
                    customer.phone?.number || ""

            }));


        /* =================================
           RESPONSE
        ================================= */

        return sendResponse(

            res,

            200,

            true,

            "Customers fetched successfully",

            {

                customers:
                    formattedCustomers,

                pagination: {

                    page: pageNumber,

                    limit: limitNumber,

                    total,

                    pages: Math.ceil(
                        total / limitNumber
                    )

                }

            }

        );

    }
);


/* =========================================
   GET SINGLE CUSTOMER
========================================= */

export const getAdminCustomer = asyncHandler(
    async (req, res) => {

        const {
            id
        } = req.params;


        if (
            !mongoose.Types.ObjectId.isValid(id)
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Invalid customer ID"
            );

        }


        const customer =
            await User.findOne({
                _id: id,
                role: ROLES.USER
            })
                .select(
                    "-password -__v"
                )
                .lean();


        if (!customer) {

            return sendResponse(
                res,
                404,
                false,
                "Customer not found"
            );

        }


        /* =================================
           ORDER STATISTICS
        ================================= */

        const [
            totalOrders,
            deliveredOrders,
            cancelledOrders,
            pendingOrders,
            spentResult
        ] = await Promise.all([

            Order.countDocuments({
                user: id
            }),

            Order.countDocuments({
                user: id,
                status: "Delivered"
            }),

            Order.countDocuments({
                user: id,
                status: "Cancelled"
            }),

            Order.countDocuments({
                user: id,
                status: {
                    $in: [
                        "Pending",
                        "Confirmed",
                        "Processing",
                        "Shipped"
                    ]
                }
            }),

            Order.aggregate([

                {
                    $match: {
                        user:
                            new mongoose.Types.ObjectId(id),

                        status: {
                            $ne: "Cancelled"
                        }
                    }
                },

                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$pricing.total"
                        }
                    }
                }

            ])

        ]);


        /* =================================
           RECENT ORDERS
        ================================= */

        const recentOrders =
            await Order.find({
                user: id
            })

                .select(
                    "orderNumber pricing.total status payment createdAt items"
                )

                .sort({
                    createdAt: -1
                })

                .limit(10)

                .lean();


        /* =================================
           FORMAT CUSTOMER
        ================================= */

        const formattedCustomer = {

            ...customer,

            name:
                `${customer.firstName || ""} ${customer.lastName || ""}`
                    .trim(),

            mobile:
                customer.phone?.number || ""

        };


        /* =================================
           RESPONSE
        ================================= */

        return sendResponse(

            res,

            200,

            true,

            "Customer fetched successfully",

            {

                customer:
                    formattedCustomer,

                stats: {

                    totalOrders,

                    deliveredOrders,

                    cancelledOrders,

                    pendingOrders,

                    totalSpent:
                        spentResult[0]?.total || 0

                },

                recentOrders

            }

        );

    }
);


/* =========================================
   UPDATE CUSTOMER STATUS
========================================= */

export const updateAdminCustomerStatus =
    asyncHandler(async (req, res) => {

        const {
            status
        } = req.body;


        /* =================================
           VALIDATE STATUS
        ================================= */

        const allowedStatuses = [

            STATUS.ACTIVE,

            STATUS.BLOCKED

        ];


        if (
            !allowedStatuses.includes(status)
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Invalid customer status"
            );

        }


        /* =================================
           VALIDATE ID
        ================================= */

        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Invalid customer ID"
            );

        }


        /* =================================
           FIND CUSTOMER
        ================================= */

        const customer =
            await User.findOne({

                _id:
                    req.params.id,

                role:
                    ROLES.USER

            });


        if (!customer) {

            return sendResponse(
                res,
                404,
                false,
                "Customer not found"
            );

        }


        /* =================================
           SAME STATUS
        ================================= */

        if (
            customer.status === status
        ) {

            return sendResponse(
                res,
                400,
                false,
                `Customer is already ${status}`
            );

        }


        /* =================================
           UPDATE
        ================================= */

        customer.status =
            status;


        await customer.save();


        /* =================================
           RESPONSE
        ================================= */

        return sendResponse(

            res,

            200,

            true,

            `Customer ${status === STATUS.BLOCKED
                ? "blocked"
                : "activated"
            } successfully`,

            {

                _id:
                    customer._id,

                status:
                    customer.status

            }

        );

    });