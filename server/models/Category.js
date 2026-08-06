import mongoose from "mongoose";

import { STATUS } from "../constants/constants.js";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        image: {
            url: {
                type: String,
                default: ""
            },
            publicId: {
                type: String,
                default: ""
            }
        },

        sortOrder: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: Object.values(STATUS),
            default: STATUS.ACTIVE
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Category", categorySchema);