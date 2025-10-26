import mongoose from "mongoose";
import { logger } from "./logger";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://72401672_db_user:93LAKsHwuqHN30vS@cluster0.jmwn4xi.mongodb.net/?appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI!);
    logger.info("MongoDB Atlas conectado!");
  } catch (error) {
    logger.error("Conexão com o MongoDB falhou!");
    process.exit(1);
  }
};
