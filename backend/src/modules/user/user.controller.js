import { getAllUsersService, updateUserRoleService, updateUserStatusService } from "./user.service.js";

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
};

const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = await updateUserRoleService(id, role);
        res.status(200).json({ success: true, message: "Role updated successfully", data: user });
    } catch (error) {
        next(error);
    }
};

const updateUserStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const user = await updateUserStatusService(id, status);
        res.status(200).json({ success: true, message: "Status updated successfully", data: user });
    } catch (error) {
        next(error);
    }
};

export { getAllUsers, updateUserRole, updateUserStatus };
