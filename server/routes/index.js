import express from "express";

import authRoutes from "./auth.routes.js";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.route.js";
import cartRoutes from "./cart.routes.js";
import wishlistRoutes from "./wishlist.routes.js";
import addressRoutes from "./address.routes.js";
import orderRoutes from "./order.routes.js";
import adminRoutes from "./admin.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use( "/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/addresses", addressRoutes);
router.use("/orders", orderRoutes);
router.use("/admin", adminRoutes);


router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to GDS Electronics API 🚀"
    });
});

export default router;