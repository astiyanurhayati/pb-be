import express from "express";
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchaseController.js"; 

const router = express.Router();

router.post("/purchases", createPurchase);
router.get("/purchases", getAllPurchases);
router.get("/purchases/:id", getPurchaseById);
router.put("/purchases/:id", updatePurchase);
router.delete("/purchases/:id", deletePurchase);

export default router;
