import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    usernname: {
        type: String,
        required: true,
        unique: true,    
    },
    fullname: {
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