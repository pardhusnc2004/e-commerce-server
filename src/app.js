import express from 'express'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectDB } from './utils/connect.db.js';
import { config } from 'dotenv';
config();
import authRouter from './routes/auth.routes.js'
import protectedRouter from './routes/protected.route.js'

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}))

app.use('/api/auth', authRouter);
app.use('/api/protected', protectedRouter);

const PORT = process.env.PORT;

await connectDB();

app.listen(PORT, async () => {
    console.log(`Listening on PORT ${PORT}`);
})