import express from "express";

import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to GDS Electronics API 🚀"
    });
});

export default router;