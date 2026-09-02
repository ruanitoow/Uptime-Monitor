import prisma from "../libs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function createToken(userData) {
    const SECRET = process.env.SECRET;

    const payload = {
        id: userData.id,
        name: userData.name
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

    return token;
}

async function loginUsers(info) {
    const { email, password } = info;

    const userData = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (userData === null) {
        const error = Error("Email ou senha inválidos");
        error.statusCode = 401;
        throw error;
    }

    const passwordVerification = await bcrypt.compare(password, userData.password)

    if (!passwordVerification) {
        const error = Error("Email ou senha inválidos");
        error.statusCode = 401;
        throw error;
    }

    const newToken = createToken(userData.id && userData.name);

    return {
        message: "Usuário logado com sucesso",
        token: newToken
    };
}

export { loginUsers }