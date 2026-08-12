import User from "../models/User.js";
import Otp from "../models/Otp.js";

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
    sendEmail
} from "../utils/emailSender.js";

import {
    createAndSendOtp,
    verifyOtp
} from "../controllers/otp.controller.js";

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

    email = email
        .toLowerCase()
        .trim();


    if (password.length < 6) {

        return sendResponse(
            res,
            400,
            false,
            "Password must be at least 6 characters"
        );

    }


    const existingUser =
        await User.findOne({
            email
        });


    if (existingUser) {

        /*
         * If the account exists but has
         * not been verified, allow the
         * user to request another OTP.
         */

        if (!existingUser.isVerified) {

            await createAndSendOtp({
                email,
                firstName:
                    existingUser.firstName,
                purpose:
                    "REGISTRATION"
            });

            return sendResponse(
                res,
                200,
                true,
                "Verification OTP sent"
            );

        }


        return sendResponse(
            res,
            409,
            false,
            "User already exists"
        );

    }


    const user =
        await User.create({

            firstName,

            lastName,

            email,

            password,

            isVerified: false

        });


    await createAndSendOtp({

        email: user.email,

        firstName: user.firstName,

        purpose: "REGISTRATION"

    });


    return sendResponse(
        res,
        201,
        true,
        "Registration successful. Verification OTP sent.",
        {
            email: user.email
        }
    );

});

export const verifyRegistrationOtp = async (
    req,
    res
) => {

    try {

        const {
            email,
            otp
        } = req.body;


        const result =
            await verifyOtp({

                email,

                otp,

                purpose:
                    "REGISTRATION"

            });


        if (!result.success) {

            return res.status(400).json({

                message:
                    result.message

            });

        }


        const user =
            await User.findOne({

                email:
                    email.toLowerCase().trim()

            });


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }


        user.isVerified = true;

        await user.save();


        return res.status(200).json({

            success: true,

            message:
                "Email verified successfully."

        });

    }
    catch (error) {

        return res.status(500).json({

            message:
                "Email verification failed."

        });

    }

};

export const resendOtp =
    asyncHandler(async (req, res) => {

        const {
            email,
            purpose
        } = req.body;


        if (!email || !purpose) {

            return sendResponse(
                res,
                400,
                false,
                "Email and OTP purpose are required"
            );

        }


        const normalizedEmail =
            email
                .toLowerCase()
                .trim();


        const allowedPurposes = [
            "REGISTRATION",
            "FORGOT_PASSWORD"
        ];


        if (
            !allowedPurposes.includes(
                purpose
            )
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Invalid OTP purpose"
            );

        }


        const user =
            await User.findOne({
                email:
                    normalizedEmail
            });


        if (!user) {

            return sendResponse(
                res,
                200,
                true,
                "If an account exists, an OTP has been sent"
            );

        }


        if (
            purpose === "REGISTRATION" &&
            user.isVerified
        ) {

            return sendResponse(
                res,
                400,
                false,
                "Email is already verified"
            );

        }


        await createAndSendOtp({

            email:
                normalizedEmail,

            firstName:
                user.firstName,

            purpose

        });


        return sendResponse(
            res,
            200,
            true,
            "OTP sent successfully"
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

    if (!user.isVerified) {
        return sendResponse(
            res,
            403,
            false,
            "Please verify your email before logging in"
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
                email:
                    normalizedEmail
            });


        /*
         * Don't reveal whether the
         * account exists.
         */

        if (!user) {

            return sendResponse(
                res,
                200,
                true,
                "If an account exists, an OTP has been sent"
            );

        }


        await createAndSendOtp({

            email:
                user.email,

            firstName:
                user.firstName,

            purpose:
                "FORGOT_PASSWORD"

        });


        return sendResponse(
            res,
            200,
            true,
            "If an account exists, an OTP has been sent"
        );

    });

export const verifyForgotPasswordOtp =
    asyncHandler(async (req, res) => {

        const {
            email,
            otp
        } = req.body;


        if (!email || !otp) {

            return sendResponse(
                res,
                400,
                false,
                "Email and OTP are required"
            );

        }


        const normalizedEmail =
            email
                .toLowerCase()
                .trim();


        const result =
            await verifyOtp({

                email:
                    normalizedEmail,

                otp,

                purpose:
                    "FORGOT_PASSWORD"

            });


        if (!result.success) {

            return sendResponse(
                res,
                400,
                false,
                result.message
            );

        }


        return sendResponse(
            res,
            200,
            true,
            "OTP verified successfully",
            {
                email: normalizedEmail
            }
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
            email,
            password
        } = req.body;


        if (!email || !password) {

            return sendResponse(
                res,
                400,
                false,
                "Email and password are required"
            );

        }


        if (password.length < 6) {

            return sendResponse(
                res,
                400,
                false,
                "Password must be at least 6 characters"
            );

        }


        const normalizedEmail =
            email
                .toLowerCase()
                .trim();


        const otpRecord =
            await Otp.findOne({

                email: normalizedEmail,

                purpose:
                    "FORGOT_PASSWORD",

                verified: true

            });


        if (!otpRecord) {

            return sendResponse(
                res,
                400,
                false,
                "Password reset verification required"
            );

        }


        /*
         * Make sure the verified OTP
         * has not expired.
         */

        if (
            otpRecord.expiresAt <
            new Date()
        ) {

            await Otp.deleteOne({
                _id: otpRecord._id
            });

            return sendResponse(
                res,
                400,
                false,
                "OTP has expired"
            );

        }


        const user =
            await User.findOne({
                email: normalizedEmail
            });


        if (!user) {

            return sendResponse(
                res,
                404,
                false,
                "User not found"
            );

        }


        user.password =
            password;


        await user.save();


        await Otp.deleteOne({
            _id: otpRecord._id
        });


        return sendResponse(
            res,
            200,
            true,
            "Password reset successfully"
        );

    });