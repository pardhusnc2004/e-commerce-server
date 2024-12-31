import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config();

export const authenticate = (req, res, next) => {
    try {
        const token = req.cookies['jwt_secret'];
        if(!token) {
            return res.status(403).json({message: "Forbidden request"});
        }
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload.user;
        next();
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}