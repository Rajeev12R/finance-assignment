import express from "express";
import { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentActivity } from "./dashboard.controller.js";
import { protect } from "../../../middlewares/auth.middleware.js";
import { authorize } from "../../../middlewares/role.middleware.js";

const router = express.Router();

router.get("/summary", protect, authorize("viewer", "analyst", "admin"), getSummary);
router.get("/category-breakdown", protect, authorize("viewer", "analyst", "admin"), getCategoryBreakdown);
router.get("/monthly-trends", protect, authorize("viewer", "analyst", "admin"), getMonthlyTrends);
router.get("/recent-activity", protect, authorize("viewer", "analyst", "admin"), getRecentActivity);

export default router;