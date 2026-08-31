import { registerUsers } from "../services/register.service";

async function registerUser(req, res){
    const register = await registerUsers(req.body);
    res.status(201).json(register)
}

export { registerUser }
