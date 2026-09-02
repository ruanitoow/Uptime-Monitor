import createUserSchema from "../validations/registerSchema.js";

function validateUserRequest(req, res, next) {
    const result = createUserSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Dados de registro inválidos.", errors: result.error.flatten().fieldErrors });
    }
    req.body = result.data;
    next();
}

export default validateUserRequest;