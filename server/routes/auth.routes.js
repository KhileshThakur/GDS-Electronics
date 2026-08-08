import express from "express";

import {
    register,
    login,
    logout,
    profile,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword
} from "../controllers/auth.controller.js";

import {
    protect
} from "../middlewares/auth.js";


const router =
    express.Router();


/* =================================
   Authentication
================================= */

router.post(
    "/register",
    register
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
    "/reset-password/:token",
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