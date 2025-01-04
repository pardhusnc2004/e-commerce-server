import express from 'express'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './utils/connect.db.js';
import { config } from 'dotenv';
config();
import authRouter from './routes/auth.routes.js'
import protectedRouter from './routes/protected.route.js'
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use('/api/auth', authRouter);
app.use('/api/protected', protectedRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const PORT = process.env.PORT;

await connectDB();

app.listen(PORT, async () => {
    console.log(`Listening on PORT ${PORT}`);
})