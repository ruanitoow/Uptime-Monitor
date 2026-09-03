import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET

function validateAuth(req, res, next) {
    const jwtCookie = req.cookies.token;
    
    if (!jwtCookie) {
        res.status(401).json({ error: "Acesso negado" });
        return;
    }

    try {
        const payload = jwt.verify(jwtCookie, SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(403).json({ error: "Acesso negado" });
    }
}

export default validateAuth;