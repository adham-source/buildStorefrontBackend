"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../models/user"));
var generateToken_1 = __importDefault(require("../utilities/generateToken"));
var User = new user_1.default();
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    UsersController.prototype.getUsers = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.index()];
                    case 1:
                        users = _b.sent();
                        if (!users.length || users.length === 0) {
                            res.status(404).json({
                                success: false,
                                message: 'Users are not found',
                            });
                            return [2 /*return*/];
                        }
                        res.json({
                            success: true,
                            data: users,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.status(500).json({
                            success: false,
                            message: 'Error! Something is wrong.',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, User.show(id)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(404).json({
                                success: false,
                                message: 'User is not found.',
                            });
                            return [2 /*return*/];
                        }
                        res.json({
                            success: true,
                            data: user,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.status(500).json({
                            success: false,
                            message: 'Error! Something is wrong.',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, user, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User.create({
                                name: name,
                                email: email,
                                password: password,
                            })];
                    case 1:
                        user = _c.sent();
                        if (!user || user === null) {
                            res.status(400).json({
                                success: false,
                                message: 'User is already exist.',
                            });
                            return [2 /*return*/];
                        }
                        res.status(201).json({
                            success: true,
                            data: user,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _c.sent();
                        res.status(500).json({
                            success: false,
                            message: 'Error! Something is wrong.',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user_id, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        user_id = req.user.id;
                        if (id !== user_id) {
                            res.status(401).json({
                                success: false,
                                message: 'Unauthorized.',
                            });
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, User.delete(id)];
                    case 1:
                        user = _b.sent();
                        if (!user || user === undefined) {
                            res.status(404).json({
                                success: false,
                                message: "User can't be deleted. because It isn't found.",
                            });
                            return [2 /*return*/];
                        }
                        res.json({
                            success: true,
                            data: user,
                            message: 'User deleted successfuly.',
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        res.status(500).json({
                            success: false,
                            message: 'Error! Something is wrong.',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UsersController.prototype.authUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, token, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, User.authenticate(email, password)];
                    case 1:
                        user = _c.sent();
                        if (user === null) {
                            res.status(401).json({
                                success: false,
                                message: 'Email or password is wrong.',
                            });
                            return [2 /*return*/];
                        }
                        token = (0, generateToken_1.default)(user.id, user.name, user.email);
                        res.header('x-auth-token', token).json({
                            success: true,
                            message: 'Login successfuly.',
                            token: token,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _b = _c.sent();
                        res.status(500).json({
                            success: false,
                            message: 'Error! Something is wrong.',
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.default = UsersController;
