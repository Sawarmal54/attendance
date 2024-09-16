import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';
import workerRouter from './routes/worker.route.js'
import locationRouter from './routes/location.route.js'
import cookieParser from 'cookie-parser';
import attendancerouter from './routes/attend.route.js';
import path from 'path';
import cors from 'cors';
dotenv.config();



mongoose
    .connect(process.env.MONGO)
    .then(()=>{
        console.log('Connected To the Database');
    }).catch((err)=>{
        console.log(err);
    });


const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.listen(5000, () =>{
    console.log("server is running on 5000")
})

app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true,
}));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


app.use('/api/auth', authRouter);
app.use('/api/worker', workerRouter);
app.use('/api/location', locationRouter);
app.use('/api/attendance', attendancerouter);

app.get('/' ,(req,res) => {
    res.send("hellow wolrd");
} )