import express from "express";
import {
  createPurchase,
  getAllPurchases,
  getPurchaseById,
  getUserPurchases,
  updatePurchase,
  deletePurchase,
  paymentMethods,
  doProccessWebhookMidtrans
} from "../controllers/Purchase.js";

const router = express.Router();

router.post("/purchases", createPurchase);
router.get("/purchases/user/:id", getUserPurchases);
router.get("/purchases", getAllPurchases);
router.get("/purchases/:id", getPurchaseById);
router.put("/purchases/:id", updatePurchase);
router.delete("/purchases/:id", deletePurchase);
router.post("/payment", paymentMethods);
router.post("/process-midtrans", doProccessWebhookMidtrans);

export default router;
