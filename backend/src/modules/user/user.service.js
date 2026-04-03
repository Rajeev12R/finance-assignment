import User from "./User.js";

const getAllUsersService = async () => {
    return await User.find({}).select("-password");
};

const updateUserRoleService = async (userId, role) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
    ).select("-password");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
};

const updateUserStatusService = async (userId, status) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { status },
        { new: true, runValidators: true }
    ).select("-password");
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    return user;
};

export { getAllUsersService, updateUserRoleService, updateUserStatusService };
