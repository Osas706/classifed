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
    displayPicture: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        unique: true,
        required: false,
    },
    coubtry: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    
},{minimize: false}, {timestamps: true});

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

export default UserModel;