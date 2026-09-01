import { loginUsers } from "../services/login.service.js";

async function loginUser(req, res) {
    const login = await loginUsers(req.body);

    res.cookie("token", login.token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    }).status(200).json(login);
}

export { loginUser };