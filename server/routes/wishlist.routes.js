import express from "express";

import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} from "../controllers/wishlist.controller.js";

import {
    protect
} from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.get(
    "/",
    getWishlist
);

router.post(
    "/",
    addToWishlist
);

router.delete(
    "/:productId",
    removeFromWishlist
);

router.delete(
    "/",
    clearWishlist
);

export default router;