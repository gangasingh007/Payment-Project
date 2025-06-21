import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();


router.get("/balance", async (req, res) => {
    const { userId } = req;
    if (!userId) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    try {
        const Account = await import('../Models/models.js').then(module => module.Account);
        const account = await Account.findOne({ userId });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.status(200).json({ balance: account.balance });
    } catch (error) {
        console.error("Error fetching balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/transfer", async (req, res) =>{
    const session = await mongoose.startSession();
    session.startTransaction();

    const { fromAccount, toAccount, amount } = req.body;
    if (!fromAccount || !toAccount || !amount) {
        return res.status(400).json({ message: "All fields are required" });
        session.abortTransaction();
    }
    if (amount <= 0) {
        return res.status(400).json({ message: "Amount must be greater than zero" });
        session.abortTransaction(); 
    }
    if (fromAccount === toAccount) {
        return res.status(400).json({ message: "Cannot transfer to the same account" });
        session.abortTransaction();
    }
    if (amount < 1 || amount > 10000) {
        return res.status(400).json({ message: "Amount must be between 1 and 10000" });
        session.abortTransaction();
    }
    if (fromAccount === undefined || toAccount === undefined) {
        return res.status(400).json({ message: "Invalid account IDs" });
        session.abortTransaction();
    }

    try {
        const Transaction = await import('../Lib/Transactions.js').then(module => module.Transaction);
        await Transaction(fromAccount, toAccount, amount);
        await session.commitTransaction();
        res.status(200).json({ message: "Transfer successful" });
    } catch (error) {
        console.error("Error during transfer:", error);
        await session.abortTransaction();
        res.status(500).json({ message: "Internal server error" });
    } finally {
        session.endSession();
    }
});

export default router;
