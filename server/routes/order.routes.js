import express from "express";

import {
    getOrders,
    getOrder,
    createOrder,
    cancelOrder,
    updateOrderStatus
} from "../controllers/order.controller.js";

import {
    protect,
    adminOnly
} from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

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

router.patch(
    "/:id/cancel",
    cancelOrder
);

router.patch(
    "/:id/status",
    adminOnly,
    updateOrderStatus
);

export default router;