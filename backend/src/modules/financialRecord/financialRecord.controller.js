import { createRecordService, getAllRecordsService, getRecordByIdService, updateRecordService, deleteRecordService } from "./financialRecord.service.js";

const createFinancialRecord = async(req, res) => {
    try {
        const newRecord = await createRecordService(req.body, req.user._id);

        res.status(201).json({success: true, message: "Financial record created successfully", data: newRecord});

    } catch (error) {
        res.status(500).json({success: false, message: "Server Error", error: error.message})
    }
}

const getFinancialRecords = async(req, res) => {
    try {
        const records = await getAllRecordsService(req.query);

        res.status(200).json({success: true, ...records});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error", error: error.message})
    }
}

const getFinancialRecordById = async(req, res) => {
    try {
        const {id} = req.params;

        const record = await getRecordByIdService(id);
        if(!record){
            return res.status(404).json({success: false, message: "Record not found"});
        }
        res.status(200).json({success: true, data: record});


    } catch (error) {
        res.status(500).json({success: false, message: "Server Error", error: error.message}) 
    }
}

const updateFinancialRecord = async (req, res) => {
    try {
        const updatedRecord = await updateRecordService(req.params.id, req.body);

        if (!updatedRecord) {
            return res.status(404).json({ success: false, message: "Record not found"});
        }

        res.status(200).json({ success: true,data: updatedRecord});
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error", error: error.message}) 
    }    
}

const deleteFinancialRecord = async (req, res) => {
    try {
        const deletedRecord = await deleteRecordService(req.params.id);

        if (!deletedRecord) {
            return res.status(404).json({ success: false, message: "Record not found"});
        }
        res.status(200).json({ success: true, message: "Record deleted successfully"});
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {createFinancialRecord, getFinancialRecords, getFinancialRecordById, updateFinancialRecord, deleteFinancialRecord};