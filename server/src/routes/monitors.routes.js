import { Router } from "express";
import validateMonitor from "../middlewares/validateMonitor.middleware.js";
import registerMonitor from "../controllers/monitors.controller.js";
const router = Router();

router.post("/monitors", validateMonitor, registerMonitor);

export default router;