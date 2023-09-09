import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/users.js";

const abc = express.Router();

abc.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });

    // console.log(existingUser);

    if (existingUser) {
        return res.status(400).json({
            error: "User already exists! Please login."
        });
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({
        message: "User crated successfully! Please login."
    });
})

abc.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = userModel.findOne({ username });

    if (!existingUser) {
        return res.status(404).json({
            error: "User doesn't exist!"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Incorrect username or password!"
        });
    }

    const token = jwt.sign({ id: existingUser._id }, "secret");
    res.json({
        token,
        userId: existingUser._id
    });
})

export { abc as userRouter };