import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";

//Routes
import authRoute from "./auth/auth.route.js"

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use('/api/auth', authRoute);



app.get('/health', (req, res) => {
    res.send("Health is OK. Backend running.")
})
app.listen((port), () => {
    connectDB();
    console.log(`Server Started at PORT: http://localhost:${port}`);
})


