import express from "express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest";
import { logger } from "./utils/logger";

const app = express();
const PORT = 3001;

// parse JSON Body - Converte para poder usar os métodos POST
app.use(express.json());
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

const startServer = async () => {
  try {
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
