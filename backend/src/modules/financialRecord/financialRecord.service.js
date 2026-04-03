import FinancialRecord from "./FinancialRecord.js";

const createRecordService = async (recordData, userId) => {
    const { amount, type, category, date, notes } = recordData;

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
    const query = { isDeleted: false };

    if (filters.type) query.type = filters.type;
    if (filters.category) query.category = filters.category;

    if (filters.startDate || filters.endDate) {
        query.date = {};
        if (filters.startDate) query.date.$gte = new Date(filters.startDate);
        if (filters.endDate) query.date.$lte = new Date(filters.endDate);
    }

    if (filters.search) {
        query.notes = { $regex: filters.search, $options: "i" };
    }

    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const skip = (page - 1) * limit;

    const records = await FinancialRecord.find(query)
        .populate("createdBy", "name, email")
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit);

    const total = await FinancialRecord.countDocuments(query);

    return {
        total,
        page,
        limit,
        records
    };
}

const getRecordByIdService = async (id) => {
    return await FinancialRecord.findOne({ _id: id, isDeleted: false }).populate("createdBy", "name email");
};

const updateRecordService = async (id, updateData) => {
    return await FinancialRecord.findOneAndUpdate({ _id: id, isDeleted: false }, updateData, { new: true, runValidators: true });
};

const deleteRecordService = async (id) => {
    return await FinancialRecord.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

export { createRecordService, getAllRecordsService, getRecordByIdService, updateRecordService, deleteRecordService };