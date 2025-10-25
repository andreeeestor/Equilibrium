import express from "express"

const app = express();
const PORT = 3001;

// parse JSON Body - Converte
app.use(express.json())


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  console.log(`Acesse aqui: http://localhost:${PORT}`);
});
