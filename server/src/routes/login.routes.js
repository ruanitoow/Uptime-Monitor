import { Router } from "express";
import { loginUser } from "../controllers/login.controller.js";
import validateLogin from "../middlewares/validateLogin.middleware.js";

const router = Router();

router.post("/login", validateLogin, loginUser);

export default router;