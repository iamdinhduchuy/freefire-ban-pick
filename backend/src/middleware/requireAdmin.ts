import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
import { getJwtSecret } from "../config/jwt.ts";

export type JwtUserPayload = {
  userId?: string;
  email?: string;
  role?: "user" | "collaborator" | "admin";
};

function getBearerToken(request: Request) {
  const authorization = request.get("authorization")?.trim();

  if (!authorization?.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  return authorization.slice(7).trim();
}

export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  try {
    const token = getBearerToken(request);

    if (!token) {
      return response.status(401).json({ message: "Token không hợp lệ" });
    }

    const payload = jwt.verify(token, getJwtSecret()) as JwtUserPayload;

    if (payload.role !== "admin") {
      return response.status(403).json({ message: "Bạn không có quyền truy cập. Yêu cầu admin." });
    }

    return next();
  } catch {
    return response.status(401).json({ message: "Token không hợp lệ hoặc đã hết hiệu lực" });
  }
}