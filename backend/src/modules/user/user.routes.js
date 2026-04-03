import express from "express";
import { getAllUsers, updateUserRole, updateUserStatus } from "./user.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.use(protect); //I have added global middleware
router.use(authorize("admin"));

router.get("/", getAllUsers);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/status", updateUserStatus);

export default router;
