import mongoose from "mongoose";

const adSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
      },
    title: {
        type : String,
        required: true
    },
    description: {
        type : String,
        required: false
    },
    category: {
        type : String,
        required: false
    },
    condition: {
        type : String,
        required: false
    },
    price: {
        type : Number,
        required: false
    },
    terms: {
        type : String,
        required: false
    },
    adImage: {
        type : String,
        required: false
    },

    displayImage: {
        type : String,
        required: false
    },
    firstName: {
        type : String,
        required: false
    },
    lastName: {
        type : String,
        required: false
    },
    email: {
        type : String,
        required: false
    },
    phoneNumber: {
        type : String,
        required: false
    },
    country: {
        type : String,
        required: false
    },
    state: {
        type : String,
        required: false
    },
},{timestamps: true});

const AdModel = mongoose.models.ad || mongoose.model('ad', adSchema);

export default AdModel;