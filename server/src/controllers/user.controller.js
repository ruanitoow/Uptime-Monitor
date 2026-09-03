import { getUserData } from "../services/user.service.js";

const userControl = {}

userControl.data = (req, res) => {
    const data = getUserData(req.cookies.token);

    if (data) {
        res.status(200).json({ message: "Successfully retrieved data", ...data });
    } else {
        res.status(403).json({ message: "Couldn't retrieve data" });
    }
}

export { userControl }