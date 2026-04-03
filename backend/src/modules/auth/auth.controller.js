import { registerUser, loginUser } from "./auth.service.js";

const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({ message: "User created", user });
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const {user, token} = await loginUser(email, password);
        res.status(200).json({ token, user });
    } catch (error) {
        next(error);
    }
}

export {register, login}