import { Router } from "express";
import { login } from "../controllers/authController.ts";

export const authRoutes = Router();

authRoutes.post("/login", login);