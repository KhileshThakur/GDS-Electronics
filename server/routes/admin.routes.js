import express from "express";
import {
    protect,
    adminOnly
} from "../middlewares/auth.js";

const router = express.Router();

router.use(protect)
router.use(adminOnly);

import { getAdminDashboard } from "../controllers/admin.controller.js";

router.get("/dashboard", getAdminDashboard);

export default router;