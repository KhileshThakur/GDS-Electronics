import express from "express";

import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to GDS Electronics API 🚀"
    });
});

export default router;