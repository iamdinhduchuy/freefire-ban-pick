import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import { getJwtSecret } from "../config/jwt.ts";
import { User } from "../models/User.ts";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function login(request: Request, response: Response) {
  try {
    const { email, password } = request.body as LoginBody;

    if (!email || !password) {
      return response.status(400).json({ message: "email và password là bắt buộc" });
    }

    const user = await User.findOne({ where: { email } });

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
    return response.status(500).json({ message: "Không thể đăng nhập", error });
  }
}