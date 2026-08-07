import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    mobile: {
        type: String,
        required: true,
        trim: true
    },

    addressLine1: {
        type: String,
        required: true,
        trim: true
    },

    addressLine2: {
        type: String,
        default: ""
    },

    landmark: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    country: {
        type: String,
        default: "India"
    },

    pincode: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "home",
            "office",
            "other"
        ],
        default: "home"
    },

    isDefault: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

export default mongoose.model(
    "Address",
    addressSchema
);