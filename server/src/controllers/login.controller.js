import { tr } from "zod/v4/locales";
import { loginUsers } from "../services/login.service.js";

async function loginUser(req, res) {
    const login = await loginUsers(req.body);

    res.cookie("token", login.token, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000
    })

    res.status(200).json(login);
}

export { loginUser };