import express from "express";

import {
    protect,
    adminOnly
} from "../middlewares/auth.js";

import {
    getAdminDashboard
} from "../controllers/admin.controller.js";

import {
    getAdminCustomers,
    getAdminCustomer,
    updateAdminCustomerStatus
} from "../controllers/admin.customer.controller.js";


const router = express.Router();


router.use(protect);
router.use(adminOnly);


/* =================================
   DASHBOARD
================================= */

router.get(
    "/dashboard",
    getAdminDashboard
);


/* =================================
   CUSTOMERS
================================= */

router.get(
    "/customers",
    getAdminCustomers
);


router.get(
    "/customers/:id",
    getAdminCustomer
);


router.patch(
    "/customers/:id/status",
    updateAdminCustomerStatus
);


export default router;