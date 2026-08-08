import mongoose from "mongoose";
import bcrypt from "bcrypt";

import { ROLES, STATUS } from "../constants/constants.js";

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        phone: {
            countryCode: {
                type: String,
                default: "+91"
            },

            number: String
        },

        avatar: {
            url: String,
            publicId: String
        },

        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.USER
        },

        status: {
            type: String,
            enum: Object.values(STATUS),
            default: STATUS.ACTIVE
        },

        isVerified: {
            type: Boolean,
            default: false
        },
         passwordResetToken: {
            type: String,
            default: null
        },

        passwordResetExpires: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;