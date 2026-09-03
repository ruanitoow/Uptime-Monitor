import createMonitorSchema from "../validations/monitorSchema.js";

function validateMonitor(req, res, next) {
    const result = createMonitorSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Dados enviados para criação do monitor são inválidos.", errors: result.error.flatten().fieldErrors });
    }
    req.body = result.data;
    next();
}


export default validateMonitor;