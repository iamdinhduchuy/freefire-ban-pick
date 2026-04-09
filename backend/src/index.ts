import "dotenv/config";
import { sequelize } from "./config/database.ts";
import { app } from "./app.ts";

const port = Number(process.env.PORT ?? 4000);

async function bootstrap() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Backend listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
}

void bootstrap();
