import createMonitor from "../services/monitors.service.js"

async function registerMonitor(req, res){
    const monitor = await createMonitor(req.body);
    res.status(201).json(monitor)
}

export default registerMonitor;