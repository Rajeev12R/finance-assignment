import FinancialRecord from "../models/FinancialRecord.js";

const createRecordService = async (recordData, userId) => {
    const {amount, type, category, date, notes} = recordData;

    if (!amount || !type || !category || !date) {
        throw new Error("Missing required fields");
    }

    return await FinancialRecord.create({
        amount, 
        type, 
        category, 
        date, 
        notes,
        createdBy: userId
    })
}

const getAllRecordsService = async (filters) => {
    const query = {};

    if(filters.type) query.type = filters.type;
    if(filters.category) query.category = filters.category;

    return await FinancialRecord.find(query).populate("createdBy", "name, email").sort({date: -1});
}

const getRecordByIdService = async (id) => {
    return await FinancialRecord.findById(id).populate("createdBy", "name email");
};

const updateRecordService = async (id, updateData) => {
    return await FinancialRecord.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
};

export const deleteRecordService = async (id) => {
    return await FinancialRecord.findByIdAndDelete(id);
};

export {createRecordService, getAllRecordsService, getRecordByIdService, updateRecordService, deleteRecordService};