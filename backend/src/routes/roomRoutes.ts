import { Router } from "express";
import { getRoomById, createRoom, getRooms, getRoomsWithoutPagination } from "../controllers/roomsController.ts";
import { requireAdmin } from "../middleware/requireAdmin.ts";

export const roomRoutes = Router();

roomRoutes.get("/", getRooms);
roomRoutes.get("/all", requireAdmin, getRoomsWithoutPagination);
roomRoutes.get("/:id", getRoomById);
roomRoutes.post("/", createRoom);