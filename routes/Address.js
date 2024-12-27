import {
    createAddress,
    getAllAddresses,
    getAddressById,
    updateAddress,
    deleteAddress

} from "../controllers/Address.js"; 

import express from "express";

const router = express.Router();

router.post("/addresses", createAddress);
router.get("/addresses", getAllAddresses);
router.get("/addresses/:id", getAddressById);
router.put("/addresses/:id", updateAddress);
router.delete("/addresses/:id", deleteAddress);

export default router;