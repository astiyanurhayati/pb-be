import express from "express";
import {
  register,
  login,
  getSelf,
} from "../controllers/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/single", getSelf);

export default router;
