import express from "express";
import { createFinancialRecord, getFinancialRecords, getFinancialRecordById, updateFinancialRecord, deleteFinancialRecord } from "./financialRecord.controller.js";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post('/', protect, authorize("admin"), createFinancialRecord);
router.get('/', protect, getFinancialRecords);
router.get('/:id', protect, getFinancialRecordById);
router.put('/:id', protect, authorize("admin"), updateFinancialRecord);
router.delete('/:id', protect, authorize("admin"), deleteFinancialRecord);

export default router;


