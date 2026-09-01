import express from "express";
import routesRegisterSystem from "../src/routes/register.routes.js"
import errorHandler from "./middlewares/errorHandler.middlerware.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware de JSON do Express
app.use(express.json());

// Rota de registro
app.use(routesRegisterSystem);

// Tratamento Centralizado dos erros!
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});