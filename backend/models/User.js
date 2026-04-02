import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
        index: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 6 characters"],
        select: false
    },
    role: {
        type: String,
        enum: ["viewer", "analyst", "admin"],
        default: "viewer"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
},{ 
    timestamps: true 
});

const User = mongoose.model("User", userSchema);
export default User;