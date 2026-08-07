import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

import {
    validateCartItem
} from "../validators/cartValidation.js";

export const getCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({
        user: req.user._id
    })
        .populate(
            "items.product",
            "name slug price discountPrice images stock variants status"
        )

    return sendResponse(
        res,
        200,
        true,
        "Cart fetched successfully",
        cart || { items: [] }
    );

});

export const addToCart = asyncHandler(async (req, res) => {

    const {
        product,
        variantSku = "",
        quantity
    } = req.body;

    const error = validateCartItem(req.body);

    if (error) {
        return sendResponse(
            res,
            400,
            false,
            error
        );
    }

    const existingProduct = await Product.findById(product);

    if (!existingProduct) {
        return sendResponse(
            res,
            404,
            false,
            "Product not found"
        );
    }

    if (existingProduct.status !== "active") {
        return sendResponse(
            res,
            400,
            false,
            "Product is not available"
        );
    }

    let availableStock = existingProduct.stock;

    if (variantSku) {

        const variant = existingProduct.variants.find(
            variant => variant.sku === variantSku
        );

        if (!variant) {
            return sendResponse(
                res,
                404,
                false,
                "Variant not found"
            );
        }

        availableStock = variant.stock;

    }

    if (quantity > availableStock) {
        return sendResponse(
            res,
            400,
            false,
            `Only ${availableStock} item(s) available`
        );
    }

    let cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {

        cart = await Cart.create({
            user: req.user._id,
            items: []
        });

    }

    const existingItem = cart.items.find(item =>
        item.product.toString() === product &&
        item.variantSku === variantSku
    );

    if (existingItem) {

        const newQuantity =
            existingItem.quantity + quantity;

        if (newQuantity > availableStock) {
            return sendResponse(
                res,
                400,
                false,
                `Only ${availableStock} item(s) available`
            );
        }

        existingItem.quantity = newQuantity;

    }
    else {

        cart.items.push({
            product,
            variantSku,
            quantity
        });

    }

    await cart.save();

    await cart.populate(
        "items.product",
        "name slug price discountPrice images stock variants status"
    );

    return sendResponse(
        res,
        200,
        true,
        "Item added to cart",
        cart
    );

});

export const updateCartItem = asyncHandler(async (req, res) => {

    const { itemId } = req.params;

    const { quantity } = req.body;

    if (quantity === undefined) {

        return sendResponse(
            res,
            400,
            false,
            "Quantity is required"
        );

    }

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {

        return sendResponse(
            res,
            404,
            false,
            "Cart not found"
        );

    }

    const item = cart.items.id(itemId);

    if (!item) {

        return sendResponse(
            res,
            404,
            false,
            "Cart item not found"
        );

    }

    if (quantity <= 0) {

        item.deleteOne();

    }
    else {

        const product = await Product.findById(
            item.product
        );

        if (!product) {

            return sendResponse(
                res,
                404,
                false,
                "Product not found"
            );

        }

        let availableStock = product.stock;

        if (item.variantSku) {

            const variant = product.variants.find(
                variant => variant.sku === item.variantSku
            );

            if (!variant) {

                return sendResponse(
                    res,
                    404,
                    false,
                    "Variant not found"
                );

            }

            availableStock = variant.stock;

        }

        if (quantity > availableStock) {

            return sendResponse(
                res,
                400,
                false,
                `Only ${availableStock} item(s) available`
            );

        }

        item.quantity = quantity;

    }

    await cart.save();

    await cart.populate(
        "items.product",
        "name slug price discountPrice images stock variants status"
    );

    return sendResponse(
        res,
        200,
        true,
        "Cart updated successfully",
        cart
    );

});

export const removeCartItem = asyncHandler(async (req, res) => {

    const { itemId } = req.params;

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {

        return sendResponse(
            res,
            404,
            false,
            "Cart not found"
        );

    }

    const item = cart.items.id(itemId);

    if (!item) {

        return sendResponse(
            res,
            404,
            false,
            "Cart item not found"
        );

    }

    item.deleteOne();

    await cart.save();

    await cart.populate(
        "items.product",
        "name slug price discountPrice images stock variants status"
    );

    return sendResponse(
        res,
        200,
        true,
        "Item removed successfully",
        cart
    );

});


export const clearCart = asyncHandler(async (req, res) => {

    const cart = await Cart.findOne({
        user: req.user._id
    });

    if (!cart) {

        return sendResponse(
            res,
            404,
            false,
            "Cart not found"
        );

    }

    cart.items = [];

    await cart.save();

    return sendResponse(
        res,
        200,
        true,
        "Cart cleared successfully"
    );

});


