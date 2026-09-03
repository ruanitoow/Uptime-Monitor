import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET

function getUserData(jwtToken) {
    try {
        return jwt.verify(jwtToken, SECRET);
    } catch (err) {
        return false;
    }
}

export { getUserData };