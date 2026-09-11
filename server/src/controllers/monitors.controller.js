import { collectMonitors, createMonitor, collectMonitorsById } from "../services/monitors.service.js";

async function registerMonitor(req, res) {
    const monitor = await createMonitor(req.body, req.user.id);
    res.status(201).json(monitor)
}

async function getMonitors(req, res) {
    const monitors = await collectMonitors(req.user.id)
    res.status(200).json(monitors)
}

async function getMonitorById(req, res) {
    const monitor = await collectMonitorsById(req.params.id, req.user.id)
    if (!monitor) {
        return res.status(404).json({ error: "Monitor não encontrado" });
    }
    res.status(200).json(monitor)
}

export { registerMonitor, getMonitors, getMonitorById };