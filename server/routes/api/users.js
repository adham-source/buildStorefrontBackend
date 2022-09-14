"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_1 = __importDefault(require("../../controllers/users"));
var verifyAuthToken_1 = __importDefault(require("../../middlewares/verifyAuthToken"));
var router = (0, express_1.Router)();
var Controller = new users_1.default();
router.get('/', verifyAuthToken_1.default, Controller.getUsers);
router.get('/:id', verifyAuthToken_1.default, Controller.getUser);
router.delete("/:id", verifyAuthToken_1.default, Controller.deleteUser);
router.post('/register', Controller.createUser);
router.post('/login', Controller.authUser);
exports.default = router;
