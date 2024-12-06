import express from "express";
import { validateInput } from "../middlewares/validator.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { registerNewUser, loginUser, getCurrentUser } from "../Contollers/auth.controller.js";

const router = express.Router();

router.post("/register", validateInput("registration"), registerNewUser);
router.post("/login", validateInput("login"), loginUser);
router.get("/me", requireAuth, getCurrentUser);

export default router;
