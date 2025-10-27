import express from "express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest";
import { logger } from "./utils/logger";
import { connectDB } from "./utils/db";
import cors from "cors";
import authRouter from "./routes/auth";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/auth", authRouter);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`Servidor rodando na porta: ${PORT}`);
      logger.info(`Acesse aqui: http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
};

startServer();
