import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post("/signup", async (req, res) => {
    const {username, password, fullname,} = req.body;
    if (!username || !password || !fullname) {
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
        const newUser = new User({
            usernname: username,
            fullname: fullname,
            password: password,
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

router.post("/login", async (req, res) => {
    const { username, password } = req.body; 
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const User = await import('../Models/user.model.js').then(module => module.User);
        const user = await User.findOne({ usernname: username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {   
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }  
});

export default router;