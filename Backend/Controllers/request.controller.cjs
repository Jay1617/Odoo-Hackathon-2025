const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const SwapRequest = require("../Models/request.model.cjs");
const Product = require("../Models/product.model.cjs");
const User = require("../Models/user.model.cjs");

exports.sendRequest = asyncHandler(async (req, res) => {
    const { offeredProduct, requestedProduct, purchase_type } = req.body;   
    const requester = req.user.id;
    if (!mongoose.isValidObjectId(offeredProduct) || !mongoose.isValidObjectId(requestedProduct)) {
        return res.status(400).json({ message: "Invalid product IDs" });
    }
    const p1 = await Product.findById(offeredProduct);
    const p2 = await Product.findById(requestedProduct);
    if (!p1 || !p2) return res.status(404).json({ message: "Product not found" });
    if (p2.owner.toString() === requester.toString()) {
        return res.status(400).json({ message: "Cannot request your own product" });
    }
    const existing = await SwapRequest.findOne({
        requester,
        owner: p2.owner,
        offeredProduct,
        requestedProduct,
        status: "pending"
    });
    if (existing) return res.status(409).json({ message: "Request already pending" });
    const swap = await SwapRequest.create({
        requester,
        owner: p2.owner,
        offeredProduct,
        requestedProduct,
        purchase_type,
        status: "pending"
    });
    res.status(201).json({ data: swap });
});

exports.cancelRequest = asyncHandler(async (req, res) => {
    const swap = await SwapRequest.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Not found" });
    if (swap.requester.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "Forbidden" });
    }
    if (swap.status !== "pending") return res.status(400).json({ message: "Cannot cancel" });
    swap.status = "cancelled";
    await swap.save();
    res.json({ data: swap });
});

exports.rejectRequest = asyncHandler(async (req, res) => {
    const swap = await SwapRequest.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Not found" });

    if (swap.owner.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "Forbidden" });
    }

    if (swap.status !== "pending") return res.status(400).json({ message: "Cannot reject" });

    swap.status = "rejected";
    await swap.save();
    res.json({ data: swap });
});

exports.acceptRequest = asyncHandler(async (req, res) => {
    const swap = await SwapRequest.findById(req.params.id);
    if (!swap) return res.status(404).json({ message: "Swap request not found" });

    if (swap.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Forbidden" });
    }

    if (swap.status !== "pending") {
        return res.status(400).json({ message: `Cannot accept a ${swap.status} request` });
    }

    swap.status = "success";
    swap.purchase_type = "via_swap";
    swap.completedAt = new Date();
    await swap.save();

    res.json({ data: swap });
});


exports.getMyRequests = asyncHandler(async (req, res) => {
    const swaps = await SwapRequest.find({ requester: req.user.id });
    res.json({ data: swaps });
});

exports.getIncomingRequests = asyncHandler(async (req, res) => {
    const swaps = await SwapRequest.find({ owner: req.user.id, status: "pending" });
    res.json({ data: swaps });
});