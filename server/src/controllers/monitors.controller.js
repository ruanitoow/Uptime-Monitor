import { collectMonitors, createMonitor } from "../services/monitors.service.js";

async function registerMonitor(req, res){
    const monitor = await createMonitor(req.body, req.user.id);
    res.status(201).json(monitor)
}

async function getMonitors(req, res) {
    const monitors = await collectMonitors(req.user.id)
    res.status(200).json(monitors)
}

export { registerMonitor, getMonitors };