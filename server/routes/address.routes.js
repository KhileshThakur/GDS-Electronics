import express from "express";

import {
    getAddresses,
    getAddress,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress
} from "../controllers/address.controller.js";

import {
    protect
} from "../middlewares/auth.js";

const router = express.Router();

router.use(protect);

router.get(
    "/",
    getAddresses
);

router.get(
    "/:id",
    getAddress
);

router.post(
    "/",
    createAddress
);

router.put(
    "/:id",
    updateAddress
);

router.delete(
    "/:id",
    deleteAddress
);

router.patch(
    "/:id/default",
    setDefaultAddress
);

export default router;