import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./src/config/db.js";

import cors from "cors";
import authRoutes from "./auth/auth.route.js"
import recordRoutes from "./src/modules/financialRecord/financialRecord.routes.js"
import dashboardRoutes from "./src/modules/dashboard/dashboard.routes.js"

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.get('/health', (req, res) => {
    res.send("Health is OK. Backend running.")
})
app.listen((port), () => {
    connectDB();
    console.log(`Server Started at PORT: http://localhost:${port}`);
})


