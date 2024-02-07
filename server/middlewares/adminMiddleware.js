import { decodeToken } from "../utils/jwt.js";
import UserModel from "../models/UserModel.js";


export const isAdmin = async (req, res, next) => {
    try {
        let token = req.cookies.token || req.headers.authorization;

        const decodedToken = decodeToken(token);

        (decodedToken);

        req.userId = decodedToken;

        const user = await UserModel.findByPk(req.userId);

        if (user && user.roles === "admin") {
            next();
        } else {
            res.status(403).json({ error: 'Acceso denegado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};