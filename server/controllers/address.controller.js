import Address from "../models/Address.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

import {
    validateAddress
} from "../validators/addressValidation.js";

export const getAddresses = asyncHandler(async (req, res) => {

    const addresses = await Address.find({
        user: req.user._id
    }).sort({
        isDefault: -1,
        createdAt: -1
    });

    return sendResponse(
        res,
        200,
        true,
        "Addresses fetched successfully",
        addresses
    );

});

export const getAddress = asyncHandler(async (req, res) => {

    const address = await Address.findOne({
        _id: req.params.id,
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

    return sendResponse(
        res,
        200,
        true,
        "Address fetched successfully",
        address
    );

});

export const createAddress = asyncHandler(async (req, res) => {

    const error = validateAddress(req.body);

    if (error) {

        return sendResponse(
            res,
            400,
            false,
            error
        );

    }

    const addressCount = await Address.countDocuments({
        user: req.user._id
    });

    const address = await Address.create({

        ...req.body,

        user: req.user._id,

        isDefault: addressCount === 0

    });

    return sendResponse(
        res,
        201,
        true,
        "Address created successfully",
        address
    );

});


export const updateAddress = asyncHandler(async (req, res) => {

    const error = validateAddress(req.body);

    if (error) {

        return sendResponse(
            res,
            400,
            false,
            error
        );

    }

    const address = await Address.findOne({
        _id: req.params.id,
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

    Object.assign(
        address,
        req.body
    );

    await address.save();

    return sendResponse(
        res,
        200,
        true,
        "Address updated successfully",
        address
    );

});

export const deleteAddress = asyncHandler(async (req, res) => {

    const address = await Address.findOne({
        _id: req.params.id,
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

    const wasDefault = address.isDefault;

    await address.deleteOne();

    if (wasDefault) {

        const nextAddress = await Address.findOne({
            user: req.user._id
        }).sort({
            createdAt: 1
        });

        if (nextAddress) {

            nextAddress.isDefault = true;

            await nextAddress.save();

        }

    }

    const addresses = await Address.find({
        user: req.user._id
    }).sort({
        isDefault: -1,
        createdAt: -1
    });

    return sendResponse(
        res,
        200,
        true,
        "Address deleted successfully",
        addresses
    );

});

export const setDefaultAddress = asyncHandler(async (req, res) => {

    const address = await Address.findOne({
        _id: req.params.id,
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
    if (address.isDefault) {

        return sendResponse(
            res,
            200,
            true,
            "Address is already default",
            address
        );

    }

    await Address.updateMany(
        {
            user: req.user._id
        },
        {
            isDefault: false
        }
    );

    address.isDefault = true;

    await address.save();

    return sendResponse(
        res,
        200,
        true,
        "Default address updated",
        address
    );

});

