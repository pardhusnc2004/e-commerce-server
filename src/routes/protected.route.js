import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { protectedPage } from "../utils/sample.protected.js";

const protectedRouter = Router();

protectedRouter.get('/test', authenticate, protectedPage);

export default protectedRouter;