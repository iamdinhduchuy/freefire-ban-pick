
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database.ts";

export type PickBanAttributes = {
  id: number;
  roomId: string;
  type: "pick" | "ban";
  team: "A" | "B";
  heroId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type PickBanCreationAttributes = Omit<PickBanAttributes, "id">;

export class PickBan extends Model<PickBanAttributes, PickBanCreationAttributes> implements PickBanAttributes {
  declare id: number;
  declare roomId: string;
  declare type: "pick" | "ban";
  declare team: "A" | "B";
  declare heroId: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

PickBan.init(
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
    type: {
      type: DataTypes.ENUM("pick", "ban"),
      allowNull: false,
    },
    team: {
      type: DataTypes.ENUM("A", "B"),
      allowNull: false,
    },
    heroId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "pick_bans",
  },
);
