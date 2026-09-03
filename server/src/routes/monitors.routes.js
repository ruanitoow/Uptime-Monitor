import { Router } from "express";
import validateMonitor from "../middlewares/validateMonitor.middleware.js";
import { registerMonitor, getMonitors } from "../controllers/monitors.controller.js";
import validateAuth from "../middlewares/validateAuth.middleware.js";
const router = Router();

router.post("/monitors", validateAuth, validateMonitor, registerMonitor);
router.get("/monitors", validateAuth, getMonitors)

export default router;