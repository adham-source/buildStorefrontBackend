"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = __importDefault(require("./api/users"));
var products_1 = __importDefault(require("./api/products"));
var orders_1 = __importDefault(require("./api/orders"));
var router = (0, express_1.Router)();
router.use('/users', users_1.default);
router.use('/products', products_1.default);
router.use('/orders', orders_1.default);
exports.default = router;
