import { createRecordService, getAllRecordsService, getRecordByIdService, updateRecordService, deleteRecordService } from "./financialRecord.service.js";

const createFinancialRecord = async(req, res, next) => {
    try {
        const newRecord = await createRecordService(req.body, req.user._id);

        res.status(201).json({success: true, message: "Financial record created successfully", data: newRecord});

    } catch (error) {
        next(error);
    }
}

const getFinancialRecords = async(req, res, next) => {
    try {
        const records = await getAllRecordsService(req.query);

        res.status(200).json({success: true, ...records});
    } catch (error) {
        next(error);
    }
}

const getFinancialRecordById = async(req, res, next) => {
    try {
        const {id} = req.params;

        const record = await getRecordByIdService(id);
        if(!record){
            const error = new Error("Record not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({success: true, data: record});


    } catch (error) {
        next(error);
    }
}

const updateFinancialRecord = async (req, res, next) => {
    try {
        const updatedRecord = await updateRecordService(req.params.id, req.body);

        if (!updatedRecord) {
            const error = new Error("Record not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ success: true,data: updatedRecord});
    } catch (error) {
        next(error);
    }    
}

const deleteFinancialRecord = async (req, res, next) => {
    try {
        const deletedRecord = await deleteRecordService(req.params.id);

        if (!deletedRecord) {
            const error = new Error("Record not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ success: true, message: "Record deleted successfully"});
    } catch (error) {
        next(error);
    }
};

export {createFinancialRecord, getFinancialRecords, getFinancialRecordById, updateFinancialRecord, deleteFinancialRecord};