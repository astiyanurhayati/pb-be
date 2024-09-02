import express from "express";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
  deleteShipment,
} from "../controllers/shipmentController.js"; 

const router = express.Router();

router.post("/shipments", createShipment);
router.get("/shipments", getAllShipments);
router.get("/shipments/:id", getShipmentById);
router.put("/shipments/:id", updateShipment);
router.delete("/shipments/:id", deleteShipment);

export default router;
