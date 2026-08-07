import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

import {
    validateCreateOrder
} from "../validators/orderValidation.js";


export const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({
        user: req.user._id
    })
        .sort({
            createdAt: -1
        });

    return sendResponse(
        res,
        200,
        true,
        "Orders fetched successfully",
        orders
    );

});

export const getOrder = asyncHandler(async (req, res) => {

    const order = await Order.findOne({

        _id: req.params.id,

        user: req.user._id

    });

    if (!order) {

        return sendResponse(
            res,
            404,
            false,
            "Order not found"
        );

    }

    return sendResponse(
        res,
        200,
        true,
        "Order fetched successfully",
        order
    );

});


export const createOrder = asyncHandler(async (req, res) => {

    const error = validateCreateOrder(req.body);

    if (error) {

        return sendResponse(
            res,
            400,
            false,
            error
        );

    }

    const {
        addressId,
        paymentMethod
    } = req.body;

    const paymentMethods = [
        "COD",
        "RAZORPAY"
    ];

    if (!paymentMethods.includes(paymentMethod)) {

        return sendResponse(
            res,
            400,
            false,
            "Invalid payment method"
        );

    }
    const address = await Address.findOne({
        _id: addressId,
        user: req.user._id
    });

    if (!address) {

        return sendResponse(
            res,
            404,
            false,
            "Address not found"
        );

    }

    const cart = await Cart.findOne({
        user: req.user._id
    }).populate("items.product");

    if (
        !cart ||
        cart.items.length === 0
    ) {

        return sendResponse(
            res,
            400,
            false,
            "Cart is empty"
        );

    }

    let subtotal = 0;

    const orderItems = [];

    for (const item of cart.items) {

        const product = item.product;

        if (!product) {

            return sendResponse(
                res,
                404,
                false,
                "Product not found"
            );

        }

        if (product.status !== "active") {

            return sendResponse(
                res,
                400,
                false,
                `${product.name} is unavailable`
            );

        }

        let stock = product.stock;

        let sku = product.sku;

        let originalPrice = product.price;

        let finalPrice =
            product.discountPrice || product.price;

        if (item.variantSku) {

            const variant =
                product.variants.find(
                    variant =>
                        variant.sku === item.variantSku
                );

            if (!variant) {

                return sendResponse(
                    res,
                    404,
                    false,
                    "Variant not found"
                );

            }

            stock = variant.stock;

            sku = variant.sku;

            originalPrice = variant.price;

            finalPrice =
                variant.discountPrice ||
                variant.price;

        }

        if (item.quantity > stock) {

            return sendResponse(
                res,
                400,
                false,
                `Only ${stock} item(s) available for ${product.name}`
            );

        }

        const lineTotal =
            finalPrice * item.quantity;

        subtotal += lineTotal;

        orderItems.push({

            product: product._id,

            name: product.name,

            slug: product.slug,

            image:
                product.images?.[0]?.url || "",

            sku,

            variantSku:
                item.variantSku,

            quantity:
                item.quantity,

            price:
                originalPrice,

            discountPrice:
                finalPrice,

            subtotal:
                lineTotal

        });

    }

    const shipping = 0;

    const tax = 0;

    const discount = 0;

    const total =
        subtotal +
        shipping +
        tax -
        discount;

    const orderNumber =
        `ORD-${new Date().getFullYear()}-${Date.now()}`;

    const order =
        await Order.create({

            orderNumber,

            user: req.user._id,

            items: orderItems,

            shippingAddress: {

                fullName:
                    address.fullName,

                mobile:
                    address.mobile,

                addressLine1:
                    address.addressLine1,

                addressLine2:
                    address.addressLine2,

                landmark:
                    address.landmark,

                city:
                    address.city,

                state:
                    address.state,

                country:
                    address.country,

                pincode:
                    address.pincode

            },

            pricing: {

                subtotal,

                shipping,

                tax,

                discount,

                total

            },

            payment: {

                method: paymentMethod,

                status: "Pending"

            },

            status: "Pending",

            timeline: [

                {

                    status: "Pending",

                    note: "Order placed",

                    updatedAt:
                        new Date()

                }

            ]

        });

    for (const item of cart.items) {

        const product =
            await Product.findById(
                item.product
            );

        if (item.variantSku) {

            const variant =
                product.variants.find(
                    variant =>
                        variant.sku === item.variantSku
                );

            if (!variant) {

                continue;

            }

            variant.stock -= item.quantity;
        }
        else {

            product.stock -=
                item.quantity;

        }

        await product.save();

    }

    cart.items = [];

    await cart.save();

    return sendResponse(
        res,
        201,
        true,
        "Order created successfully",
        order
    );

});


export const cancelOrder = asyncHandler(async (req, res) => {

    const order = await Order.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!order) {

        return sendResponse(
            res,
            404,
            false,
            "Order not found"
        );

    }

    if (
        !["Pending", "Confirmed"]
            .includes(order.status)
    ) {

        return sendResponse(
            res,
            400,
            false,
            "Order cannot be cancelled"
        );

    }

    for (const item of order.items) {

        const product =
            await Product.findById(item.product);

        if (!product) {
            continue;
        }

        if (item.variantSku) {

            const variant =
                product.variants.find(
                    variant =>
                        variant.sku === item.variantSku
                );

            if (variant) {

                variant.stock += item.quantity;

            }

        }
        else {

            product.stock += item.quantity;

        }

        await product.save();

    }

    order.status = "Cancelled";

    order.timeline.push({

        status: "Cancelled",

        note: "Cancelled by customer",

        updatedAt: new Date()

    });

    await order.save();

    return sendResponse(
        res,
        200,
        true,
        "Order cancelled successfully",
        order
    );

});


export const updateOrderStatus = asyncHandler(async (req, res) => {

    const { status } = req.body;

    const order = await Order.findById(
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

    const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Returned"
    ];

    if (!allowedStatuses.includes(status)) {

        return sendResponse(
            res,
            400,
            false,
            "Invalid order status"
        );

    }

    order.status = status;

    order.timeline.push({

        status,

        note: `Status updated to ${status}`,

        updatedAt: new Date()

    });

    await order.save();

    return sendResponse(
        res,
        200,
        true,
        "Order status updated",
        order
    );

});

