import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { User } from "../models/User.ts";
import { getJwtSecret } from "../config/jwt.ts";
import jwt from "jsonwebtoken";
import { JwtUserPayload } from "../middleware/requireAdmin.ts";

const createUserBodySchema = z.object({
  name: z.string().trim().min(1, "name là bắt buộc"),
  email: z.string().trim().email("email không hợp lệ"),
  password: z.string().min(1, "password là bắt buộc"),
});

const userIdParamsSchema = z.object({
  id: z.coerce.number().int("id phải là số nguyên").positive("id không hợp lệ"),
});

export async function createUser(request: Request, response: Response) {
  try {
    const parsedBody = createUserBodySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return response.status(400).json({
        message: "Dữ liệu đầu vào không hợp lệ",
        errors: parsedBody.error.flatten().fieldErrors,
      });
    }

    const { name, email, password } = parsedBody.data;

    const exist = await User.findOne({ where: { email } });

    if (exist) {
      return response.status(400).json({ message: "email đã được sử dụng" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, role: "user", passwordHash });
    const { passwordHash: _passwordHash, ...userData } = user.toJSON();

    const token = jwt.sign(
      {
        userId: String(user.id),
        email: user.email,
        role: user.role,
      } as JwtUserPayload,
      getJwtSecret(),
    );

    return response.status(201).json({ message: "Tạo user thành công", data: userData, token });
  } catch (error) {
    return response.status(500).json({ message: "Không thể tạo user", error });
  }
}

export async function getUsers(_request: Request, response: Response) {
  try {
    const users = await User.findAll({ order: [["id", "DESC"]] });
    return response.json({ message: "Danh sách user", data: users });
  } catch (error) {
    return response.status(500).json({ message: "Không thể lấy danh sách user", error });
  }
}

export async function getUserById(request: Request, response: Response) {
  try {
    const parsedParams = userIdParamsSchema.safeParse(request.params);

    if (!parsedParams.success) {
      return response.status(400).json({
        message: "Dữ liệu đầu vào không hợp lệ",
        errors: parsedParams.error.flatten().fieldErrors,
      });
    }

    const { id: userId } = parsedParams.data;

    const user = await User.findByPk(userId);

    if (!user) {
      return response.status(404).json({ message: "Không tìm thấy user" });
    }

    return response.json({ message: "Chi tiết user", data: user });
  } catch (error) {
    return response.status(500).json({ message: "Không thể lấy user", error });
  }
}
