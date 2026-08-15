import express from "express";

import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getRelatedProducts,
    getProductById,
    updateProductStock
} from "../controllers/product.controller.js";

import {
    protect,
    adminOnly
} from "../middlewares/auth.js";

const router = express.Router();

router.get(
    "/",
    getProducts
);

router.get(
    "/related/:id",
    getRelatedProducts
);

router.get(
    "/id/:id",
    getProductById
);

router.get(
    "/:slug",
    getProduct
);

router.post(
    "/",
    protect,
    adminOnly,
    createProduct
);

router.patch(
    "/:id/stock",
    protect,
    adminOnly,
    updateProductStock
);

router.put(
    "/:id",
    protect,
    adminOnly,
    updateProduct
);

router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProduct
);

export default router;