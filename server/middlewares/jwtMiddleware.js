import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const token = req.cookies.token || req.headers.authorization;

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    const secretKey = process.env.SECRET_KEY;

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.adminId = decoded.id;
        next();
    });
}

export default verifyToken;