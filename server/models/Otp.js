import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },

        otp: {
            type: String,
            required: true
        },

        purpose: {
            type: String,
            enum: [
                "REGISTRATION",
                "FORGOT_PASSWORD"
            ],
            required: true
        },

        expiresAt: {
            type: Date,
            required: true
        },

        attempts: {
            type: Number,
            default: 0
        },

        verified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

/*
Automatically remove expired OTP documents.
*/

otpSchema.index(
    {
        expiresAt: 1
    },
    {
        expireAfterSeconds: 0
    }
);

otpSchema.index({
    email: 1,
    purpose: 1
});

export default mongoose.model(
    "Otp",
    otpSchema
);