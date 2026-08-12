import express from "express";

import {
    register,
    login,
    logout,
    profile,
    updateProfile,
    changePassword,

    forgotPassword,
    verifyForgotPasswordOtp,
    resetPassword,

    verifyRegistrationOtp,
    resendOtp

} from "../controllers/auth.controller.js";

import {
    protect
} from "../middlewares/auth.js";

const router = express.Router();


/* =================================
   Authentication
================================= */

router.post(
    "/register",
    register
);

router.post(
    "/verify-registration",
    verifyRegistrationOtp
);

router.post(
    "/resend-otp",
    resendOtp
);

router.post(
    "/login",
    login
);

router.post(
    "/logout",
    logout
);


/* =================================
   Password Reset
================================= */

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/verify-forgot-password",
    verifyForgotPasswordOtp
);

router.post(
    "/reset-password",
    resetPassword
);


/* =================================
   Protected Profile
================================= */

router.get(
    "/profile",
    protect,
    profile
);

router.put(
    "/profile",
    protect,
    updateProfile
);

router.put(
    "/change-password",
    protect,
    changePassword
);

export default router;