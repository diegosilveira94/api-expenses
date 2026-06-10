import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';

export default function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided.' });
    }

    const [ scheme, token ] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).send({ error: 'Token error.' });
    }

    try {
        const decoded = jwt.verify(token, authConfig.jwt.secret);
        req.user = {
            id: decoded.id,
            email: decoded.email
        }
        return next();
    } catch (err) {
        return res.status(401).send({ error: 'Invalid token or token expired.' });
    }
}