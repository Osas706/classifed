import mongoose from "mongoose";
import AdModel from "./ad.model.js";

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
        type: String,
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
    bookmarkedAds: {
        type: Array,
        default: [AdModel]
    }
    
},{timestamps: true});

const UserModel = mongoose.models.user || mongoose.model('user', userSchema);

export default UserModel;