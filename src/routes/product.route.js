import { AddProduct, DeleteProdcut, EditProduct } from "../controllers/product.controller.js";
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";

const productRouter = Router();

productRouter.post('/add-product', authenticate, AddProduct);
productRouter.post('/edit-product/:productId', authenticate, EditProduct);
productRouter.delete('/delete-product/:productId', authenticate, DeleteProdcut)

export default productRouter;