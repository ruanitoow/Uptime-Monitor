import prisma from "../libs/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { useDebugValue } from "react";
import { id } from "zod/v4/locales";



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

    if (userData == null) {
        const error = Error("Esse usuário não existe");
        error.statusCode = 400;
        throw error;
    }

    const passwordVerification = await bcrypt.compare(password, userData.password)

    if (!passwordVerification) {
        const error = Error("Senha incorreta");
        error.statusCode = 400;
        throw error;
    }

    const newToken = createToken(userData.id);

    return {
        message: "Usuário logado com sucesso",
        token: newToken
    };
}

export { loginUsers }