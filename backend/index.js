import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";

import cors from "cors";
import authRoute from "./auth/auth.route.js"
import recordRoute from "./financialRecord/financialRecord.routes.js"

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/financialRecord', recordRoute);



app.get('/health', (req, res) => {
    res.send("Health is OK. Backend running.")
})
app.listen((port), () => {
    connectDB();
    console.log(`Server Started at PORT: http://localhost:${port}`);
})


