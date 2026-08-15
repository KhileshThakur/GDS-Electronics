import express from "express";

import {
    getInventory,
    getInventorySummary,
    getInventoryProduct,
    updateStock,
    updateVariantStock
} from "../controllers/admin.inventory.controller.js";

import {
    protect,
    adminOnly
} from "../middlewares/auth.js";

const router = express.Router();


// =====================================================
// Inventory
// =====================================================

router.get(
    "/",
    protect,
    adminOnly,
    getInventory
);


// =====================================================
// Summary
// =====================================================

router.get(
    "/summary",
    protect,
    adminOnly,
    getInventorySummary
);


// =====================================================
// Single Product
// =====================================================

router.get(
    "/:id",
    protect,
    adminOnly,
    getInventoryProduct
);


// =====================================================
// Product Stock
// =====================================================

router.patch(
    "/:id/stock",
    protect,
    adminOnly,
    updateStock
);


// =====================================================
// Variant Stock
// =====================================================

router.patch(
    "/:id/variant/:variantId/stock",
    protect,
    adminOnly,
    updateVariantStock
);


export default router;