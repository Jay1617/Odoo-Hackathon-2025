const mongoose = require("mongoose");

const SwapRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    offeredProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    requestedProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "cancelled", "success", "rejected"],
        default: "pending",
        required: true
    },
    purchase_type: {
        type: String,
        enum: ["via-point", "via_swap"],
        required: true
    }
}, { timestamps: true });

SwapRequestSchema.index({ owner: 1, requester: 1, status: 1 });

module.exports = mongoose.model("SwapRequest", SwapRequestSchema);
