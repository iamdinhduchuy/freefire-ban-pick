import { Router } from "express";
import { requireAdmin } from "../middleware/requireAdmin.ts";
import { createUser, getUserById, getUsers } from "../controllers/userController.ts";

export const userRoutes = Router();

userRoutes.get("/", requireAdmin, getUsers);
userRoutes.get("/:id", requireAdmin, getUserById);
userRoutes.post("/", createUser);
