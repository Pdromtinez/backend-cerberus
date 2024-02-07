import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

export function createToken(payload) {
    return jwt.sign(payload, secretKey);
}

export function decodeToken(token) {
    try {
        const decoded = jwt.verify(token, secretKey, {expires: new Date(Date.now() + 60 * 60 * 1000)});
        return decoded;
    } catch (error) {
        console.error('Error al decodificar el token:', error.message);
        return null;
    }
}
