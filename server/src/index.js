import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.middlerware.js";
import routesRegisterSystem from "./routes/register.routes.js";
import routesLoginSystem from "./routes/login.routes.js";

// Setup do dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configuração do CORS para permitir integração Front-Back
const corsConfig = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}
app.use(cors(corsConfig))

// Middleware de JSON do Express
app.use(express.json());

// Rota de registro
app.use(routesRegisterSystem);

// Rota de login
app.use(routesLoginSystem);

// Tratamento Centralizado dos erros!
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});