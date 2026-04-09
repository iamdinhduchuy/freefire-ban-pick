import cors from "cors";
import express from "express";
import morgan from "morgan";
import { authRoutes } from "./routes/authRoutes.ts";
import { userRoutes } from "./routes/userRoutes.ts";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
