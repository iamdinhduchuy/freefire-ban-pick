
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database.ts";
import { get } from "https";

export type RoomAttributes = {
  id: number;
  roomId: string;
  name: string;
  bestOf: "BO1" | "BO3" | "BO5" | "BO7" | "BO11";
  status: "waiting" | "playing" | "finished" | "canceled";
  maxPlayers: number;
  teamAName: string;
  teamBName: string;
  teamAImage: string;
  teamBImage: string;
  teamScoreA: number;
  teamScoreB: number;
  teamAPlayers: string[]; // Danh sách username của người chơi team A
  teamBPlayers: string[]; // Danh sách username của người chơi team B
  password: string;
  maxBans: number;
  expiredAt?: Date; // Thời điểm phòng hết hạn, sau thời điểm này phòng sẽ tự động bị xóa (6 tiếng sau khi tạo)
  createdAt?: Date;
  updatedAt?: Date;
};

export type RoomCreationAttributes = Omit<RoomAttributes, "id" | "status" | "currentPlayers" | "teamScoreA" | "teamScoreB" | "expiredAt" | "teamAPlayers" | "teamBPlayers">;

export class Room extends Model<RoomAttributes, RoomCreationAttributes> implements RoomAttributes {
  declare id: number;
  declare roomId: string;
  declare name: string;
  declare bestOf: "BO1" | "BO3" | "BO5" | "BO7" | "BO11";
  declare status: "waiting" | "playing" | "finished" | "canceled";
  declare maxPlayers: number;
  declare teamAName: string;
  declare teamBName: string;
  declare teamAImage: string;
  declare teamBImage: string;
  declare teamAPlayers: string[];
  declare teamBPlayers: string[];
  declare teamScoreA: number;
  declare teamScoreB: number;
  declare password: string;
  declare maxBans: number;
  declare expiredAt?: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    bestOf: {
      type: DataTypes.ENUM("BO1", "BO3", "BO5", "BO7", "BO11"),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("waiting", "playing", "finished", "canceled"),
      allowNull: false,
      defaultValue: "waiting",
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamAName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    teamBName: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    teamAImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    teamBImage: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    teamScoreA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    teamScoreB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    maxBans: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    expiredAt: {
      type: DataTypes.VIRTUAL,
      get() {
        const createdTime = this.getDataValue('createdAt');

        if (createdTime) {
          const expireDate = new Date(createdTime);

          expireDate.setHours(expireDate.getHours() + 6);

          return expireDate;
        }

        return null;
      },
      set(value) {
        throw new Error('Trường expiredAt là trường tự động, không thể gán thủ công!');
      }
    },
    teamAPlayers: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    teamBPlayers: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    }
  },
  {
    sequelize,
    tableName: "rooms",
  },
);