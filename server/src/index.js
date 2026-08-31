import express from "express";
const app = express();
import routesRegisterSystem from "../src/routes/register.routes.js"
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routesRegisterSystem);

app.listen(port, () => {
    console.log(`Rodando API em: http://localhost:${port}`);
});