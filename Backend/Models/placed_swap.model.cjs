const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const SwapRequestSchema = new Schema({
    requester: {
        type: Types.ObjectId,
        ref: "User",
        required: true,             // must always know who initiated the request
        index: true
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,             // who owns the original product
        index: true
    },
    requestedProduct: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,             // the product the requester wants
        index: true
    },
    offeredProduct: {
        type: Types.ObjectId,
        ref: "Product",
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected", "cancelled"],
        default: "pending",
        required: true,
        index: true
    }
}, {
    timestamps: true
});

SwapRequestSchema.index(
    { owner: 1, status: 1 },
    { name: "owner_status_idx" }
);
SwapRequestSchema.index(
    { requester: 1, status: 1 },
    { name: "requester_status_idx" }
);

module.exports = model("SwapRequest", SwapRequestSchema);
