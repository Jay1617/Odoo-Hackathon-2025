const express = require("express");
const protect = require("../Middleware/protect.middleware.cjs");
const swapController = require("../Controllers/request.controller.cjs");

const router = express.Router();

router.use(protect);

router.route("/")
    .post(swapController.sendRequest)
    .get(swapController.getMyRequests);

router.route("/incoming")
    .get(swapController.getIncomingRequests);

router.route("/:id/cancel")
    .delete(swapController.cancelRequest);

router.route("/:id/reject")
    .post(swapController.rejectRequest);

router.route("/:id/accept")
    .post(swapController.acceptRequest);

module.exports = router;
