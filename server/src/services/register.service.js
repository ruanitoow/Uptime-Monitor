import prisma from "../libs/prisma.js";
import bcrypt from 'bcrypt';

async function registerUsers(info) {
    const { name, email, password } = info;
    const mailExists = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (mailExists !== null) {
        const erro = Error("Esse email já foi cadastrado")
        erro.statusCode = 409;
        throw erro;
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const data = { name, email, password: hashPassword }
    const newUser = await prisma.user.create({
        data
    })
    const { password: _, ...safeUser } = newUser;
    return safeUser;

}
export { registerUsers };