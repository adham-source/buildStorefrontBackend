"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var configs_1 = __importDefault(require("../configs"));
var generateToken = function (id, name, email) {
    return jsonwebtoken_1.default.sign({ id: id, name: name, email: email }, configs_1.default.TOKEN_SECRET, { expiresIn: '1h' });
};
exports.default = generateToken;
