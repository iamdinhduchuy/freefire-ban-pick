import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database.ts";

export type UserAttributes = {
  id: number;
  name: string;
  email: string;
  role: "user" | "collaborator" | "admin";
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserCreationAttributes = Optional<UserAttributes, "id" | "role">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public role!: "user" | "collaborator" | "admin";
  public passwordHash!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "collaborator", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  },
);
