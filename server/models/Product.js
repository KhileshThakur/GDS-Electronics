import mongoose from "mongoose";

import { STATUS } from "../constants/constants.js";

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            default: ""
        },

        publicId: {
            type: String,
            default: ""
        }
    },
    {
        _id: false
    }
);

const attributeSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            trim: true
        },

        value: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const specificationSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
            trim: true
        },

        value: {
            type: String,
            required: true,
            trim: true
        }
    },
    {
        _id: false
    }
);

const variantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        sku: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        discountPrice: {
            type: Number,
            default: 0,
            min: 0,
            validate: {
                validator(value) {
                    return value <= this.price;
                },
                message: "Discount price cannot be greater than price."
            }
        },

        stock: {
            type: Number,
            default: 0,
            min: 0
        },

        attributes: [attributeSchema]
    }
);


const productSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },

        brand: {
            type: String,
            default: "",
            required: true,
            trim: true
        },

        shortDescription: {
            type: String,
            default: "",
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        images: [imageSchema],

        hasVariants: {
            type: Boolean,
            default: false
        },

        price: {
            type: Number,
            default: 0,
            min: 0
        },

        discountPrice: {
            type: Number,
            default: 0,
            min: 0,
            validate: {
                validator(value) {
                    return value <= this.price;
                },
                message: "Discount price cannot be greater than price."
            }
        },

        stock: {
            type: Number,
            default: 0,
            min: 0
        },

        sku: {
            type: String,
            unique: true,
            sparse: true,
            trim: true
        },

        variants: [variantSchema],

        specifications: [specificationSchema],

        isFeatured: {
            type: Boolean,
            default: false
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

productSchema.index({
    category: 1
});

productSchema.index({
    status: 1
});

productSchema.index({
    isFeatured: 1
});

export default mongoose.model(
    "Product",
    productSchema
);

