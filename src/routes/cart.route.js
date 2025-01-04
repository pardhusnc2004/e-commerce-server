import { AddProductToCart, DeleteProductFromCart, GetCart } from "../controllers/cart.controller.js";
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.post('/add-product', authenticate, AddProductToCart);
cartRouter.delete('/delete-product/:productId', authenticate, DeleteProductFromCart);
cartRouter.get('/get-cart', authenticate, GetCart);

export default cartRouter;