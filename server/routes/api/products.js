"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var products_1 = __importDefault(require("../../controllers/products"));
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var router = (0, express_1.Router)();
var Controller = new products_1.default();
router.get("/", Controller.getProducts);
router.get("/:id", Controller.getProduct);
router.post("/", verifyAuthToken_1.default, Controller.createProduct);
exports.default = router;
