"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var bcrypt = __importStar(require("bcrypt"));
var database_1 = __importDefault(require("../database"));
var configs_1 = __importDefault(require("../configs"));
var UserStore = /** @class */ (function () {
    function UserStore() {
        this.pepper = configs_1.default.BCRYPT_PASSWORD;
        this.saltRounds = parseInt(configs_1.default.SALT_ROUNDS);
    }
    UserStore.prototype.hash = function (password) {
        return bcrypt.hashSync(password + this.pepper, this.saltRounds);
    };
    UserStore.prototype.comparePassword = function (password, hashPassword) {
        return bcrypt.compareSync(password + this.pepper, hashPassword);
    };
    UserStore.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT id, name, email FROM users';
                        return [4 /*yield*/, connection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("Cannot get users ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT id, name, email FROM users WHERE id=($1)';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Could not find user ".concat(id, ". Error: ").concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.create = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, hashPassword, sql, result, sql_1, result_1, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        hashPassword = this.hash(user.password);
                        sql = 'SELECT email FROM users WHERE email= ($1)';
                        return [4 /*yield*/, connection.query(sql, [user.email])];
                    case 2:
                        result = _a.sent();
                        if (!(result.rowCount === 0 || !result.rows.length)) return [3 /*break*/, 4];
                        sql_1 = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email';
                        return [4 /*yield*/, connection.query(sql_1, [user.name, user.email, hashPassword])];
                    case 3:
                        result_1 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_1.rows[0]];
                    case 4:
                        connection.release();
                        return [2 /*return*/, null];
                    case 5:
                        err_3 = _a.sent();
                        throw new Error("Cannot create user ".concat(err_3));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'DELETE FROM users WHERE id = ($1) RETURNING id, name, email';
                        return [4 /*yield*/, connection.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        connection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_4 = _a.sent();
                        throw new Error("Cannot delete user ".concat(err_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserStore.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql, result, hashPassword, isPassowrdValid, result_2, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        connection = _a.sent();
                        sql = 'SELECT password FROM users WHERE email= ($1)';
                        return [4 /*yield*/, connection.query(sql, [email])];
                    case 2:
                        result = _a.sent();
                        if (!(result.rowCount === 1 || result.rows.length)) return [3 /*break*/, 4];
                        hashPassword = result.rows[0].password;
                        isPassowrdValid = this.comparePassword(password, hashPassword);
                        if (!isPassowrdValid) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection.query('SELECT id, email, name FROM users WHERE email=($1)', [email])];
                    case 3:
                        result_2 = _a.sent();
                        connection.release();
                        return [2 /*return*/, result_2.rows[0]];
                    case 4:
                        connection.release();
                        return [2 /*return*/, null];
                    case 5:
                        err_5 = _a.sent();
                        throw new Error("Cannot login ".concat(err_5));
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserStore;
}());
exports.default = UserStore;
