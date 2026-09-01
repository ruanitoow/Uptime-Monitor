import { Router } from "express";
import { registerUser } from "../controllers/register.controller.js";
import validateRegister from "../middlewares/validateRegister.middleware.js";
const router = Router();

router.post("/register", validateRegister, registerUser);

export default router;