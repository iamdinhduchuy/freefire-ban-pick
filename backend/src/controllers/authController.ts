import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { z } from "zod";
import { getJwtSecret } from "../config/jwt.ts";
import { User } from "../models/User.ts";

const loginBodySchema = z.object({
  email: z.string().trim().email("email không hợp lệ"),
  password: z.string().min(1, "password là bắt buộc"),
});

export async function login(request: Request, response: Response) {
  try {
    const parsedBody = loginBodySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return response.status(400).json({
        message: "Dữ liệu đầu vào không hợp lệ",
        errors: parsedBody.error.flatten().fieldErrors,
      });
    }

    const { email, password } = parsedBody.data;

    const user = await User.findOne({ where: { email }, raw: true });

    if (!user) {
      return response.status(401).json({ message: "Sai email hoặc password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return response.status(401).json({ message: "Sai email hoặc password" });
    }

    const token = jwt.sign(
      {
        userId: String(user.id),
        email: user.email,
        role: user.role,
      },
      getJwtSecret(),
    );

    return response.json({
      message: "Đăng nhập thành công",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Không thể đăng nhập", error });
  }
}