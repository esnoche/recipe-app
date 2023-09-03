import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { userModel } from "../models/users";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
        return res.json({
            message: "User already exists!"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 9);

    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();

    req.json({
        message: "User crated successfully!"
    });
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const existingUser = userModel.findOne({ username });

    if (!existingUser) {
        return res.json({
            message: "User doesn't exist!"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.json({
            message: "Incorrect username or password!"
        });
    }

    const token = jwt.sign({ id: existingUser._id }, "secret");
    res.json({
        token,
        userId: existingUser._id
    });
})

export { router as userRouter };