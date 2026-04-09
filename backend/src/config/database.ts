import { Sequelize } from "sequelize";

const storage = process.env.SQLITE_STORAGE ?? "database.sqlite";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: false,
});
