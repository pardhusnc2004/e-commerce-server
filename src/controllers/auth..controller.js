import USERMODEL from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateToken } from "../utils/generate.token.js";

export const SignUp = async (req, res) => {
    try {
        const {fullName, email, password, dateOfBirth, address, mobile} = req.body;
        const existingUser = await USERMODEL.findOne({email:email});
        const existingUser2 = await USERMODEL.findOne({mobile: mobile});
        if(existingUser || existingUser2) {
            return res.status(409).json({message: "Email/ Mobile is already registered"});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new USERMODEL({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            dateOfBirth: dateOfBirth,
            address: address,
            mobile: mobile
        });
        newUser.save();
        const userWithNoPassword = getUserWithoutPassword(newUser)
        generateToken(userWithNoPassword, res);
        return res.status(201).json({message: "Registration succesful", user: userWithNoPassword});
    } catch (error) {
        console.log('Error @SignUp -> user.controller.js')
        res.status(500).json({message: "Internal error occured"});
    }
}

const getUserWithoutPassword = (user) => {
    const {password, ...userWithoutPassword} = newUser
    return userWithoutPassword
}

export const Login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const existingUser = await USERMODEL.findOne({email:email});
        if(!existingUser) {
            return res.status(404).json({message: "Invalid credentials"});
        }
        const validPassword = await bcryptjs.compare(password, existingUser.password);
        if(!validPassword) {
            return res.status(404).json({message: "Invalid credentials"});
        }
        const userWithNoPassword = getUserWithoutPassword(existingUser)
        generateToken(userWithNoPassword, res);
        return res.status(200).json({message: "Login succesful", user: userWithNoPassword});
    } catch (error) {
        console.log('Error @Login -> user.controller.js')
        res.status(500).json({message: "Internal error occured"});
    }
}

export const Logout = async (req, res) => {
    try {
        res.cookie('jwt_secret', "", { maxAge: 0 });
        return res.status(200).json({message: "Logout successful"})
    } catch (error) {
        console.log('Error @Login -> user.controller.js')
        res.status(500).json({message: "Internal error occured"});
    }
}