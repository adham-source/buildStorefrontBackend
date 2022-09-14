"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var orders_1 = __importDefault(require("../../controllers/orders"));
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var router = (0, express_1.Router)();
var Controller = new orders_1.default();
router.post("/", verifyAuthToken_1.default, Controller.createOrder);
router.get("/:userId", verifyAuthToken_1.default, Controller.getOrdersByUserId);
router.post("/:id/products", verifyAuthToken_1.default, Controller.addProduct);
exports.default = router;
