import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.js";
import tripRouter from "./routes/trip.js";


dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();

app.use(morgan('dev'));
app.use(express.json({
    limit: "30mb",
    extended: true,
}));
app.use(express.urlencoded({
    limit: "30mb",
    extended: true,
}));
app.use(cors());

app.use("/users", userRouter);
app.use("/trips", tripRouter);

mongoose.connect(MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.log(`Server did not connect.\n${err} `);
    });