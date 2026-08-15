import mongoose from "mongoose";

import Order from "../models/Order.js";
import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";


/* =========================================
   GET ALL ORDERS
========================================= */

export const getAdminOrders = asyncHandler(
    async (req, res) => {

        const {
            search = "",
            status,
            paymentStatus,
            paymentMethod,
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


        const query = {};


        /* =================================
           STATUS
        ================================= */

        if (status) {

            query.status = status;

        }


        /* =================================
           PAYMENT STATUS
        ================================= */

        if (paymentStatus) {

            query["payment.status"] =
                paymentStatus;

        }


        /* =================================
           PAYMENT METHOD
        ================================= */

        if (paymentMethod) {

            query["payment.method"] =
                paymentMethod;

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


            const users =
                await User.find({

                    $or: [

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

                    ]

                }).select("_id");


            const userIds =
                users.map(
                    user => user._id
                );


            query.$or = [

                {
                    orderNumber: regex
                },

                {
                    "shippingAddress.fullName":
                        regex
                },

                {
                    "shippingAddress.mobile":
                        regex
                }

            ];


            if (userIds.length) {

                query.$or.push({

                    user: {
                        $in: userIds
                    }

                });

            }

        }


        /* =================================
           FETCH ORDERS
        ================================= */

        const [
            orders,
            total
        ] = await Promise.all([

            Order.find(query)

                .populate(
                    "user",
                    "firstName lastName email phone"
                )

                .sort({
                    createdAt: -1
                })

                .skip(skip)

                .limit(limitNumber),


            Order.countDocuments(query)

        ]);


        /* =================================
           FORMAT CUSTOMER DATA
        ================================= */

        const formattedOrders =
            orders.map(order => {

                const orderObject =
                    order.toObject();


                if (orderObject.user) {

                    orderObject.user.name =
                        `${orderObject.user.firstName || ""} ${orderObject.user.lastName || ""}`
                            .trim();


                    orderObject.user.mobile =
                        orderObject.user.phone?.number || "";

                }


                return orderObject;

            });


        /* =================================
           RESPONSE
        ================================= */

        return sendResponse(

            res,

            200,

            true,

            "Orders fetched successfully",

            {

                orders: formattedOrders,

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
   GET SINGLE ORDER
========================================= */

export const getAdminOrder = asyncHandler(
    async (req, res) => {

        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Invalid order ID"
            );

        }


        const order =
            await Order.findById(
                req.params.id
            )

            .populate(
                "user",
                "firstName lastName email phone"
            );


        if (!order) {

            return sendResponse(
                res,
                404,
                false,
                "Order not found"
            );

        }


        const orderObject =
            order.toObject();


        /* =================================
           FORMAT CUSTOMER
        ================================= */

        if (orderObject.user) {

            orderObject.user.name =
                `${orderObject.user.firstName || ""} ${orderObject.user.lastName || ""}`
                    .trim();


            orderObject.user.mobile =
                orderObject.user.phone?.number || "";

        }


        return sendResponse(

            res,

            200,

            true,

            "Order fetched successfully",

            orderObject

        );

    }
);


/* =========================================
   UPDATE ORDER STATUS
========================================= */

export const updateAdminOrderStatus =
    asyncHandler(async (req, res) => {

        const {
            status,
            note = ""
        } = req.body;


        const allowedStatuses = [

            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Delivered"

        ];


        if (
            !allowedStatuses.includes(status)
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Invalid order status"
            );

        }


        if (
            !mongoose.Types.ObjectId.isValid(
                req.params.id
            )
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Invalid order ID"
            );

        }


        const order =
            await Order.findById(
                req.params.id
            );


        if (!order) {

            return sendResponse(
                res,
                404,
                false,
                "Order not found"
            );

        }


        if (order.status === status) {

            return sendResponse(
                res,
                400,
                false,
                `Order is already ${status}`
            );

        }


        /* =================================
           PREVENT BACKWARD MOVEMENT
        ================================= */

        const statusOrder = [

            "Pending",
            "Confirmed",
            "Processing",
            "Shipped",
            "Delivered"

        ];


        const currentIndex =
            statusOrder.indexOf(
                order.status
            );


        const newIndex =
            statusOrder.indexOf(
                status
            );


        if (
            currentIndex !== -1 &&
            newIndex < currentIndex
        ) {

            return sendResponse(
                res,
                400,
                false,
                `Cannot change order from ${order.status} to ${status}`
            );

        }


        /* =================================
           UPDATE STATUS
        ================================= */

        order.status = status;


        order.timeline.push({

            status,

            note:
                note ||
                `Order status updated to ${status}`,

            updatedAt: new Date()

        });


        await order.save();


        return sendResponse(

            res,

            200,

            true,

            "Order status updated successfully",

            order

        );

    });