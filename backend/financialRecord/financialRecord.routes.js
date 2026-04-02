import express from "express";
import { createFinancialRecord, getFinancialRecords, getFinancialRecordById, updateFinancialRecord, deleteFinancialRecord} from "./financialRecord.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post('/records', protect, authorize("admin"), createFinancialRecord);
router.get('/records', protect, getFinancialRecords);
router.get('/records/:id', protect, getFinancialRecordById);
router.put('/records/:id', protect, authorize("admin"), updateFinancialRecord);
router.delete('/records/:id', protect, authorize("admin"), deleteFinancialRecord);

export default router;


