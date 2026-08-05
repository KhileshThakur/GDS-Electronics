import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";
import { generateToken, setTokenCookie, clearTokenCookie } from "../utils/auth.js";
import { validateRequiredFields } from "../utils/validation.js";
import { sanitizeUser } from "../utils/sanitize.js";
import { ROLES } from "../constants/constants.js";

export const register = asyncHandler(async (req, res) => {

    let {
        firstName,
        lastName,
        email,
        password
    } = req.body;

    const error = validateRequiredFields({
        firstName,
        lastName,
        email,
        password
    });

    if (error) {
        return sendResponse(
            res,
            400,
            false,
            error
        );
    }

    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return sendResponse(
            res,
            409,
            false,
            "User already exists"
        );
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password
    });

    return sendResponse(
        res,
        201,
        true,
        "Registration successful",
        sanitizeUser(user)
    );

});


export const login = asyncHandler(async (req, res) => {

    let {
        email,
        password
    } = req.body;

    const error = validateRequiredFields({
        email,
        password
    });

    if (error) {
        return sendResponse(
            res,
            400,
            false,
            error
        );
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
        return sendResponse(
            res,
            401,
            false,
            "Invalid email or password"
        );
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return sendResponse(
            res,
            401,
            false,
            "Invalid email or password"
        );
    }

    const token = generateToken(user._id);

    setTokenCookie(res, token);

    return sendResponse(
        res,
        200,
        true,
        "Login successful",
        sanitizeUser(user)
    );

});

export const profile = asyncHandler(async (req, res) => {

    return sendResponse(
        res,
        200,
        true,
        "Profile fetched successfully",
        sanitizeUser(req.user)
    );

});

export const logout = asyncHandler(async (req, res) => {

    clearTokenCookie(res);

    return sendResponse(
        res,
        200,
        true,
        "Logout successful"
    );
});