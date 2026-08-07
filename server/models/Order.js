import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        slug: {
            type: String,
            required: true
        },

        image: {
            type: String,
            default: ""
        },

        sku: {
            type: String,
            required: true
        },

        variantSku: {
            type: String,
            default: ""
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        price: {
            type: Number,
            required: true
        },

        discountPrice: {
            type: Number,
            required: true
        },

        subtotal: {
            type: Number,
            required: true
        }

    },
    {
        _id: false
    }
);

const shippingAddressSchema = new mongoose.Schema(
    {

        fullName: {
            type: String,
            required: true
        },

        mobile: {
            type: String,
            required: true
        },

        addressLine1: {
            type: String,
            required: true
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
        }

    },
    {
        _id: false
    }
);

const pricingSchema = new mongoose.Schema(
    {

        subtotal: {
            type: Number,
            required: true
        },

        shipping: {
            type: Number,
            default: 0
        },

        tax: {
            type: Number,
            default: 0
        },

        discount: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            required: true
        }

    },
    {
        _id: false
    }
);

const paymentSchema = new mongoose.Schema(
    {

        method: {
            type: String,
            enum: [
                "COD",
                "RAZORPAY"
            ],
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Paid",
                "Failed",
                "Refunded"
            ],
            default: "Pending"
        },

        transactionId: {
            type: String,
            default: ""
        },

        paidAt: {
            type: Date,
            default: null
        }

    },
    {
        _id: false
    }
);

const timelineSchema = new mongoose.Schema(
    {

        status: {
            type: String,
            required: true
        },

        note: {
            type: String,
            default: ""
        },

        updatedAt: {
            type: Date,
            default: Date.now
        }

    },
    {
        _id: false
    }
);

const orderSchema = new mongoose.Schema(
    {

        orderNumber: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },

        items: {
            type: [orderItemSchema],
            required: true
        },

        shippingAddress: {
            type: shippingAddressSchema,
            required: true
        },

        pricing: {
            type: pricingSchema,
            required: true
        },

        payment: {
            type: paymentSchema,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Processing",
                "Shipped",
                "Delivered",
                "Cancelled",
                "Returned"
            ],
            default: "Pending"
        },

        timeline: {
            type: [timelineSchema],
            default: []
        },

        estimatedDelivery: {
            type: Date,
            default: null
        },

        notes: {
            type: String,
            default: ""
        }

    },
    {
        timestamps: true
    }
);

export default mongoose.model(
    "Order",
    orderSchema
);