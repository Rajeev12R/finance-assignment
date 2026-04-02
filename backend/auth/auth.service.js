import bcrypt from "bcryptjs"
import User from "../models/User.js"
import { generateToken } from "../utils/jwt.js";

const registerUser = async(data) => {
    const {name, email, password} = data;

    const existUser = await User.findOne({email});
    if(existUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return user;
}

const loginUser = async(email, password) => {
    const user = await User.findOne({email}).select("+password");

    if(!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) throw new Error("Invalid credentials");

    if(user.status !== "active"){
        throw new Error("User is inactive");
    }

    const token = generateToken(user); // added jwt
    return {user, token}
}

export {registerUser, loginUser};