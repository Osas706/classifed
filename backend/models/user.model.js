import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    displayImage: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    newPassword: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: Number,
        unique: false,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    
},{timestamps: true});

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

export default UserModel;