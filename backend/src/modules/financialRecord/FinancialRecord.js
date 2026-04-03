import mongoose from "mongoose";

const financialRecordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount cannot be negative"]
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: [true, "Type is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    date: {
        type: Date,
        required: [true, "Transaction date is required"]
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [200, "Notes cannot exceed 200 characters"]
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{ 
    timestamps: true 
});

financialRecordSchema.index({ createdBy: 1 });
financialRecordSchema.index({ date: -1 });

const FinancialRecord = mongoose.model("FinancialRecord", financialRecordSchema);
export default FinancialRecord;