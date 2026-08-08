import crypto from "crypto";

import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/response.js";

import {
    generateToken,
    setTokenCookie,
    clearTokenCookie
} from "../utils/auth.js";

import {
    validateRequiredFields
} from "../utils/validation.js";

import {
    sanitizeUser
} from "../utils/sanitize.js";

import {
    ROLES
} from "../constants/constants.js";

import {
    sendEmail
} from "../utils/emailSender.js";

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

export const updateProfile =
    asyncHandler(async (req, res) => {

        const {
            firstName,
            lastName,
            phone
        } = req.body;


        if (
            !firstName?.trim() ||
            !lastName?.trim()
        ) {

            return sendResponse(
                res,
                400,
                false,
                "First name and last name are required"
            );

        }


        const user =
            await User.findById(
                req.user._id
            );


        if (!user) {

            return sendResponse(
                res,
                404,
                false,
                "User not found"
            );

        }


        user.firstName =
            firstName.trim();

        user.lastName =
            lastName.trim();


        if (phone) {

            user.phone = {

                countryCode:
                    phone.countryCode ||
                    "+91",

                number:
                    phone.number ||
                    ""

            };

        }


        await user.save();


        return sendResponse(
            res,
            200,
            true,
            "Profile updated successfully",
            sanitizeUser(user)
        );

    });

export const forgotPassword =
    asyncHandler(async (req, res) => {

        const {
            email
        } = req.body;


        if (!email) {

            return sendResponse(
                res,
                400,
                false,
                "Email is required"
            );

        }


        const normalizedEmail =
            email
                .toLowerCase()
                .trim();


        const user =
            await User.findOne({
                email: normalizedEmail
            });


        /*
         * Do not reveal whether
         * an account exists.
         */

        if (!user) {

            return sendResponse(
                res,
                200,
                true,
                "If an account exists, a password reset link has been sent"
            );

        }


        const rawToken =
            crypto.randomBytes(32)
                .toString("hex");


        const hashedToken =
            crypto
                .createHash("sha256")
                .update(rawToken)
                .digest("hex");


        user.passwordResetToken =
            hashedToken;


        user.passwordResetExpires =
            new Date(
                Date.now() +
                15 * 60 * 1000
            );


        await user.save();


        const resetUrl =
            `${process.env.CLIENT_URL}/reset-password/${rawToken}`;


        await sendEmail({

            to: user.email,

            subject:
                "Reset your GDS Electronics password",

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 32px;
                ">

                    <h2>
                        Reset your password
                    </h2>

                    <p>
                        Hi ${user.firstName},
                    </p>

                    <p>
                        We received a request to reset
                        your GDS Electronics password.
                    </p>

                    <p>
                        This link will expire in
                        15 minutes.
                    </p>

                    <a
                        href="${resetUrl}"
                        style="
                            display:inline-block;
                            padding:12px 20px;
                            background:#111;
                            color:#fff;
                            text-decoration:none;
                            border-radius:6px;
                        "
                    >
                        Reset Password
                    </a>

                    <p style="
                        margin-top:24px;
                        color:#777;
                        font-size:13px;
                    ">
                        If you didn't request this,
                        you can safely ignore this email.
                    </p>

                </div>
            `

        });


        return sendResponse(
            res,
            200,
            true,
            "If an account exists, a password reset link has been sent"
        );

    });


export const changePassword =
    asyncHandler(async (req, res) => {

        const {
            currentPassword,
            newPassword
        } = req.body;


        const error =
            validateRequiredFields({

                currentPassword,
                newPassword

            });


        if (error) {

            return sendResponse(
                res,
                400,
                false,
                error
            );

        }


        if (
            newPassword.length < 6
        ) {

            return sendResponse(
                res,
                400,
                false,
                "New password must be at least 6 characters"
            );

        }


        const user =
            await User.findById(
                req.user._id
            );


        if (!user) {

            return sendResponse(
                res,
                404,
                false,
                "User not found"
            );

        }


        const isMatch =
            await user.comparePassword(
                currentPassword
            );


        if (!isMatch) {

            return sendResponse(
                res,
                400,
                false,
                "Current password is incorrect"
            );

        }


        user.password =
            newPassword;


        user.passwordResetToken =
            null;

        user.passwordResetExpires =
            null;


        await user.save();


        return sendResponse(
            res,
            200,
            true,
            "Password changed successfully"
        );

    });

export const resetPassword =
    asyncHandler(async (req, res) => {

        const {
            token
        } = req.params;

        const {
            password
        } = req.body;


        if (!password) {

            return sendResponse(
                res,
                400,
                false,
                "Password is required"
            );

        }


        if (
            password.length < 6
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Password must be at least 6 characters"
            );

        }


        const hashedToken =
            crypto
                .createHash("sha256")
                .update(token)
                .digest("hex");


        const user =
            await User.findOne({

                passwordResetToken:
                    hashedToken,

                passwordResetExpires: {
                    $gt: new Date()
                }

            });


        if (!user) {

            return sendResponse(
                res,
                400,
                false,
                "Reset link is invalid or expired"
            );

        }


        user.password =
            password;


        user.passwordResetToken =
            null;


        user.passwordResetExpires =
            null;


        await user.save();


        return sendResponse(
            res,
            200,
            true,
            "Password reset successfully"
        );

    });