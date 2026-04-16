import type { Request, Response } from "express";
import { z } from "zod";
import { Room } from "../models/Room.ts";

const roomIdParamsSchema = z.object({
  id: z.coerce.number().int("id phải là số nguyên").positive("id không hợp lệ"),
});

const createRoomBodySchema = z.object({
  roomId: z.string().trim().min(1, "roomId là bắt buộc").regex(/^[a-zA-Z0-9_-]+$/, "roomId chỉ được chứa chữ cái, số, gạch dưới hoặc gạch ngang"),
  name: z.string().trim().min(1, "name là bắt buộc"),
  bestOf: z.enum(["BO1", "BO3", "BO5", "BO7", "BO11"]),
  maxPlayers: z.coerce.number().int("maxPlayers phải là số nguyên").positive("maxPlayers không hợp lệ"),
  teamAName: z.string().trim().min(1, "teamAName là bắt buộc"),
  teamBName: z.string().trim().min(1, "teamBName là bắt buộc"),
  teamAImage: z.string().trim().optional().default(""),
  teamBImage: z.string().trim().optional().default(""),
  maxBans: z.coerce.number().int("maxBans phải là số nguyên").min(0, "maxBans không được âm").max(14, "maxBans không được vượt quá 14"),
  password: z.string().default(""),
});

export async function getRooms(request: Request, response: Response) {
  try {
    const page = parseInt(request.query.page as string) || 1;
    const limit = parseInt(request.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    if(limit > 100) {
      return response.status(400).json({ message: "limit không được vượt quá 100" });
    }

    const { count, rows: rooms } = await Room.findAndCountAll({
      attributes: { 
        exclude: ['password']
      },
      order: [["id", "DESC"]],
      limit: limit,
      offset: offset,
    });

    return response.json({ 
      message: "Danh sách room", 
      data: rooms,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Không thể lấy danh sách room", error });
  }
}

export async function getRoomsWithoutPagination(request: Request, response: Response) {
  try {
    const rooms = await Room.findAll({
      attributes: { 
        exclude: ['password']
      },
      order: [["id", "DESC"]],
    });
    return response.json({ message: "Danh sách room", data: rooms });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Không thể lấy danh sách room", error });
  }
}

export async function getRoomById(request: Request, response: Response) {
  try {
    const parsedParams = roomIdParamsSchema.safeParse(request.params);

    if (!parsedParams.success) {
      return response.status(400).json({
        message: "Dữ liệu đầu vào không hợp lệ",
        errors: parsedParams.error.flatten().fieldErrors,
      });
    }

    const { id } = parsedParams.data;
    const room = await Room.findOne({ where: { id }, raw: true });

    if (!room) {
      return response.status(404).json({ message: "Không tìm thấy room" });
    }

    const { password, ...roomWithoutPassword } = room;

    return response.json({ message: "Thông tin room", data: roomWithoutPassword });
  } catch (error) {
    return response.status(500).json({ message: "Không thể lấy thông tin room", error });
  }
}

export async function createRoom(request: Request, response: Response) {
  try {
    const parsedBody = createRoomBodySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return response.status(400).json({
        message: "Dữ liệu đầu vào không hợp lệ",
        errors: parsedBody.error.flatten().fieldErrors,
      });
    }

    const { roomId, name, bestOf, maxPlayers, teamAName, teamBName, teamAImage, teamBImage, password, maxBans } = parsedBody.data;

    // Kiểm tra trùng roomId trước khi tạo nếu roomId trùng với 1 rooms đang tồn tại nhưng đã hết hạn thì vẫn cho phép tạo mới, còn nếu chưa hết hạn thì trả về lỗi
    const existingRoom = await Room.findOne({ where: { roomId } });

    if (existingRoom) {
      // Kiểm tra xem phòng có hết hạn chưa
      const now = new Date();
      const expiredAt = existingRoom.expiredAt;

      if (expiredAt && expiredAt > now) {
        return response.status(400).json({ message: "roomId đã tồn tại!" });
      }

      await existingRoom.destroy();
    }

    const room = await Room.create({
      roomId,
      name,
      bestOf,
      maxPlayers,
      teamAName,
      teamBName,
      teamAImage,
      teamBImage,
      password,
      maxBans,
    });

    const { password: _password, ...roomWithoutPassword } = room.toJSON();
    return response.status(201).json({ message: "Tạo room thành công", data: roomWithoutPassword });
  }
  catch (error) {
    return response.status(500).json({ message: "Không thể tạo room", error });
  }
}

export async function joinRoom(request: Request, response: Response) {

  const targetTeamName = request.body.teamName;
  const playerName = request.body.playerName;
  const inputPassword = request.body.password || "";
  const roomId = request.body.roomId;

  if(!targetTeamName) {
    return response.status(400).json({ message: "Vui lòng chọn đội" });
  }

  
  if(playerName.length === 0 || playerName.length > 20) {
    return response.status(400).json({ message: "Tên người chơi phải từ 1 đến 20 ký tự" });
  }
  
  try {
    const room = await Room.findOne({ where: { roomId } });

    if(targetTeamName !== room?.teamAName && targetTeamName !== room?.teamBName) {
      return response.status(400).json({ message: "Đội không hợp lệ" });
    }
    
    if (!room) {
      return response.status(404).json({ message: "Không tìm thấy room" });
    }

    if (room.password && room.password !== inputPassword) {
      return response.status(403).json({ message: "Sai mật khẩu" });
    }

    const side = targetTeamName === room?.teamAName ? "teamAPlayers" : "teamBPlayers";

    if (room[side].length >= room.maxPlayers / 2) {
      return response.status(400).json({ message: `Đội ${targetTeamName} đã đủ người chơi` });
    }

    if (room.teamAPlayers.includes(playerName) || room.teamBPlayers.includes(playerName)) {
      return response.status(400).json({ message: "Người chơi đã có trong phòng" });
    }

    room[side].push(playerName);

    await room.save();

    return response.json({ message: "Tham gia room thành công", data: { team: targetTeamName, playerName } });

  } catch (error) {
    return response.status(500).json({ message: "Không thể tham gia room", error });
  }
}