import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

import {
    validateWishlist
} from "../validators/wishlistValidation.js";

export const getWishlist = asyncHandler(async (req, res) => {

    const wishlist = await Wishlist.findOne({
        user: req.user._id
    }).populate(
        "products",
        "name slug price discountPrice images status"
    );

    return sendResponse(
        res,
        200,
        true,
        "Wishlist fetched successfully",
        wishlist || { products: [] }
    );

});

export const addToWishlist = asyncHandler(async (req, res) => {

    const { product } = req.body;

    const error = validateWishlist(req.body);

    if (error) {
        return sendResponse(
            res,
            400,
            false,
            error
        );
    }

    const existingProduct =
        await Product.findById(product);

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

    let wishlist =
        await Wishlist.findOne({
            user: req.user._id
        });

    if (!wishlist) {

        wishlist = await Wishlist.create({
            user: req.user._id,
            products: []
        });

    }

    const exists =
        wishlist.products.some(
            id => id.toString() === product
        );

    if (exists) {
        return sendResponse(
            res,
            409,
            false,
            "Product already in wishlist"
        );
    }

    wishlist.products.push(product);

    await wishlist.save();

    await wishlist.populate(
        "products",
        "name slug price discountPrice images status"
    );

    return sendResponse(
        res,
        200,
        true,
        "Product added to wishlist",
        wishlist
    );

});

export const removeFromWishlist = asyncHandler(async (req, res) => {

    const { productId } = req.params;

    const wishlist =
        await Wishlist.findOne({
            user: req.user._id
        });

    if (!wishlist) {
        return sendResponse(
            res,
            404,
            false,
            "Wishlist not found"
        );
    }

    const exists = wishlist.products.some(
        id => id.toString() === productId
    );

    if (!exists) {

        return sendResponse(
            res,
            404,
            false,
            "Product not found in wishlist"
        );

    }

    wishlist.products =
        wishlist.products.filter(
            id => id.toString() !== productId
        );

    await wishlist.save();

    await wishlist.populate(
        "products",
        "name slug price discountPrice images status"
    );

    return sendResponse(
        res,
        200,
        true,
        "Product removed from wishlist",
        wishlist
    );

});

export const clearWishlist = asyncHandler(async (req, res) => {

    const wishlist = await Wishlist.findOne({
        user: req.user._id
    });

    if (!wishlist) {

        return sendResponse(
            res,
            404,
            false,
            "Wishlist not found"
        );

    }

    if (wishlist.products.length === 0) {

        return sendResponse(
            res,
            200,
            true,
            "Wishlist already empty"
        );

    }

    wishlist.products = [];

    await wishlist.save();

    await wishlist.populate(
        "products",
        "name slug price discountPrice images status"
    );

    return sendResponse(
        res,
        200,
        true,
        "Wishlist cleared successfully",
        wishlist
    );

});