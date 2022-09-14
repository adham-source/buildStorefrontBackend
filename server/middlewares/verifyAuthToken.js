"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var configs_1 = __importDefault(require("../configs"));
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers['x-auth-token'];
        var token = authorizationHeader.split(' ')[1];
        if (token === null || !token) {
            res.status(401).json({
                success: false,
                message: 'Access denied.',
            });
            return;
        }
        jsonwebtoken_1.default.verify(token, configs_1.default.TOKEN_SECRET, function (err, user) {
            if (err) {
                res.status(403).json({
                    success: false,
                    message: 'Access denied.',
                });
                return;
            }
            //@ts-ignore
            req.user = user;
            next();
        });
    }
    catch (_a) {
        res.status(403).json({
            success: false,
            message: 'Access denied.',
        });
    }
};
exports.default = verifyAuthToken;
