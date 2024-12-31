import { Router } from "express";
import { Login, Logout, SignUp } from "../controllers/auth..controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/signup', SignUp);
authRouter.post('/login', Login);
authRouter.post('/logout', authenticate, Logout);

export default authRouter;