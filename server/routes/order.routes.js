import express from "express";

import {
    getOrders,
    getOrder,
    createOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
    cancelOrder
} from "../controllers/order.controller.js";

import {
    getAdminOrders,
    getAdminOrder,
    updateAdminOrderStatus
} from "../controllers/admin.order.controller.js";

import {
    protect,
    adminOnly
} from "../middlewares/auth.js";


const router = express.Router();


router.use(protect);


/* =========================================
   ADMIN ORDER ROUTES
========================================= */

router.get(
    "/admin",
    adminOnly,
    getAdminOrders
);


router.get(
    "/admin/:id",
    adminOnly,
    getAdminOrder
);


router.patch(
    "/admin/:id/status",
    adminOnly,
    updateAdminOrderStatus
);


/* =========================================
   CUSTOMER ORDER ROUTES
========================================= */

router.get(
    "/",
    getOrders
);


router.get(
    "/:id",
    getOrder
);


router.post(
    "/",
    createOrder
);


router.post(
    "/razorpay/create",
    createRazorpayOrder
);


router.post(
    "/razorpay/verify",
    verifyRazorpayPayment
);


router.patch(
    "/:id/cancel",
    cancelOrder
);


export default router;