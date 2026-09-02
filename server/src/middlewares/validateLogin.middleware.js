
import loginUserSchema from "../validations/loginSchema.js";

function validateLogin(req, res, next) {
    const result = loginUserSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({ message: "Dados de login inválidos.", erros: result.error.flatten().fieldErrors });
    }

    req.body = result.data;
    next();
}

export default validateLogin;