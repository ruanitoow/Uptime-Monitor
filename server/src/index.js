import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middlerware.js";
import routesRegisterSystem from "./routes/register.routes.js";
import routesLoginSystem from "./routes/login.routes.js";
import routesUserSystem from "./routes/user.routes.js"

const app = express();
const port = process.env.PORT || 3000;

// Setup do dotenv
dotenv.config();

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

// Middleware de Cookies
app.use(cookieparser());

// Tratamento de Erros
app.use(errorHandler);

// Rotas de API
app.use(routesRegisterSystem);
app.use(routesLoginSystem);
app.use(routesUserSystem);

app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});