import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    usernname: {
        type: String,
        required: true,
        unique: true,    
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
    }, { timestamps: true });

export const User = mongoose.model('User', userschema);

const accountScheme = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export const Account = mongoose.model('Account', accountScheme);
