import express from "express";

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} from "../controllers/category.controller.js";

import {
    protect,
    adminOnly
} from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/",
    getCategories
);

router.get(
    "/:slug",
    getCategory
);

router.post(
    "/",
    protect,
    adminOnly,
    createCategory
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateCategory
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteCategory
);

export default router;