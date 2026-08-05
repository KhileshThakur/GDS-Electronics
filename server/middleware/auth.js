import jwt from "jsonwebtoken";

import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

import { ROLES } from "../constants/constants.js";
import { STATUS } from "../constants/constants.js";

export const protect = asyncHandler(async (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return sendResponse(
            res,
            401,
            false,
            "Authentication required"
        );
    }

    let decoded;
    
    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
    } 
    catch {
        return sendResponse(
            res,
            401,
            false,
            "Invalid or expired token"
        );
    }

    const user = await User.findById(decoded.userId)
        .select("-password -__v");

    if (!user) {

        return sendResponse(
            res,
            401,
            false,
            "User not found"
        );

    }

    if (user.status === STATUS.BLOCKED) {

        return sendResponse(
            res,
            403,
            false,
            "Account has been blocked"
        );

    }
    req.user = user;
    next();
});


export const adminOnly = (req, res, next) => {

    if (req.user.role !== ROLES.ADMIN) {
        return sendResponse(
            res,
            403,
            false,
            "Access denied"
        );
    }
    next();
};