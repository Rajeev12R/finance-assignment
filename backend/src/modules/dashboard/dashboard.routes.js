import express from "express";
import { getSummary, getCategoryBreakdown, getMonthlyTrends } from "./dashboard.controller.js";
import { protect } from "../../../middlewares/auth.middleware.js";
import { authorize } from "../../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/summary", protect, authorize("analyst", "admin"), getSummary);
router.get("/category-breakdown", protect, authorize("analyst", "admin"), getCategoryBreakdown);
router.get("/monthly-trends", protect, authorize("analyst", "admin"), getMonthlyTrends);

export default router;