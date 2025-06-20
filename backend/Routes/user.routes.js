import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userCheck, userUpdateCheck } from '../Types/user.types.js';
import { authMiddleware } from '../Middlewares/user.middleware.js';

const router = express.Router();

router.post("/signup", userCheck,async (req, res) => {
    const {username, password, firstName,lastName} = req.body;
    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    try {
        const User = await import('../Models/user.model.js').then(module => module.User);
        const existingUser = await User.findOne({ usernname: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            usernname: username,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
        });

        await newUser.save();
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET);
        res.status(201).json(token,{ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin",userCheck, async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const User = await import('../Models/user.model.js').then(module => module.User);
        const user = await User.findOne({ usernname: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET);
        res.status(200).json(token,{ message: "User signed in successfully" });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/update",authMiddleware, userUpdateCheck,async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    if (!username && !firstName && !lastName && !password) {
        return res.status(400).json({ message: "At least one field is required to update" });
    }
    try {
        const User = await import('../Models/user.model.js').then(module => module.User);
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (username) user.usernname = username;
        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (password) user.password = bcrypt.hashSync(password, 10);

        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;