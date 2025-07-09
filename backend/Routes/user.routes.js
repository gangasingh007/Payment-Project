import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { userCheck, userSigninCheck, userUpdateCheck } from '../Types/user.types.js';
import { authMiddleware } from '../Middlewares/user.middleware.js';
import { Account, User } from '../Models/models.js';

const router = express.Router();

router.post("/signup",userCheck,async (req, res) => {
    const {username, password, firstName,lastName} = req.body;
    if (!username || !password || !firstName || !lastName) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    try {
        const User = await import('../Models/models.js').then(module => module.User);
        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            username: req.body.username,
            firstName: firstName,
            lastName: lastName,
            password: hashedPassword,
        });

        await newUser.save();
        await Account.create({    // generating a random balance for the user when they sign up between 1 and 10000;
            userId: newUser._id,
            balance:1+Math.floor(Math.random() * 10000)
        });
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET);
        res.status(201).json(token,{ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/signin",async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const User = await import('../Models/models.js').then(module => module.User);
        const user = await User.findOne({ username: username });
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
            res.status(201).json(token,{ message: "User created successfully" });
    } catch (error) {
        console.error("Error signing in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.put("/update",async (req, res) => {
    const { username, firstName, lastName, password } = req.body;
    if (!username && !firstName && !lastName && !password) {
        return res.status(400).json({ message: "At least one field is required to update" });
    }
    try {
        const User = await import('../Models/models.js').then(module => module.User);
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (username) user.username = username;
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


router.get("/bulk",(req,res)=>{
    const filter = req.query.filter || "";

    const users = User.find({
        $or : [{
            firstName : {
                $regex : filter
            },
            $or : {
                lastname : {
                    $regex : filter
                }
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.user._id });
        res.status(200).json({
            user: {
                _id: req.user._id,
                username: req.user.username,
                firstName: req.user.firstName,
                lastName: req.user.lastName
            },
            account
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;