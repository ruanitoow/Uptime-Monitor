import express from "express";
const app = express();
import routesRegisterSystem from "../src/routes/register.routes.js"
import errorHandler from "./middlewares/errorHandler.middlerware.js";
const port = process.env.PORT || 3000;

app.use(express.json());

// Rota de registro
app.use(routesRegisterSystem);

// Tratamentos de erros
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});