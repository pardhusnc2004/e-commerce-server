import { AddPayment, UpdatePayment, GetPayment } from "../controllers/payment.controller.js"
import { Router } from "express"
import { authenticate } from '../middlewares/auth.middleware.js'

const paymentRouter = Router();

paymentRouter.get('/get-payments/', authenticate, GetPayment);

export default paymentRouter;