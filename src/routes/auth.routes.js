import express from "express";
import { validateInput } from "../middlewares/validator.middleware.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { registerNewUser, loginUser, getCurrentUser, resetPassword } from "../Contollers/auth.controller.js";

const router = express.Router();

router.post("/register", validateInput("registration"), registerNewUser);
router.post("/login", validateInput("login"), loginUser);
router.post("/reset-password", validateInput("resetPassword"), resetPassword);
router.get("/me", requireAuth, getCurrentUser);

export default router;
