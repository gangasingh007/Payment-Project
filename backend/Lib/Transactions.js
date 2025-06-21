import { Account } from "../Models/models"

export const Transaction = async(fromAccount, toAccount, amount)=> {

    await Account.findByIdAndUpdate(fromAccount, {
        $inc: { balance: -amount }
    });

    await Account.findByIdAndUpdate(toAccount, {
        $inc: { balance: amount }
    });
}

// this function will be used to transfer money from one account to another