import express from "express";
import userRoutes from "./user.js";
import addressRoutes from "./Address.js";
import purchaseRoutes from "./Purchase.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/addresses", addressRoutes);
router.use("/purchase", purchaseRoutes);


export default router;
