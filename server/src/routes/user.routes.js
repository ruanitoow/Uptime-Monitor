import { Router } from "express";
import { userControl } from "../controllers/user.controller.js";
import validateAuth from "../middlewares/validateAuth.middleware.js";

const router = Router();

router.get("/user/data", validateAuth, userControl.data);
router.post("/user/logout", validateAuth, userControl.logout);
export default router;