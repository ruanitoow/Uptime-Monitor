import { registerUsers } from "../services/register.service.js";

async function registerUser(req, res){
    const register = await registerUsers(req.body);
    res.status(201).json(register)
}

export { registerUser }
