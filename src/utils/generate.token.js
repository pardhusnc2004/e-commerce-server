import { config } from "dotenv";
import jwt from 'jsonwebtoken';
config();

export const generateToken = async(user, res) => {
    // console.log(process.env.JWT_SECRET)
    const token = jwt.sign({user: user}, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('jwt_secret', token, {
        maxAge: 24*60*60*60,
        sameSite: "strict",
        httpOnly: true,
        secure: false,
    })
}