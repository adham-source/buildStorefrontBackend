"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var configs_1 = __importDefault(require("./configs"));
var NODE_ENV = configs_1.default.NODE_ENV, PG_USER = configs_1.default.PG_USER, PG_HOST = configs_1.default.PG_HOST, PG_DATABASE = configs_1.default.PG_DATABASE, PG_DATABASE_TEST = configs_1.default.PG_DATABASE_TEST, PG_PASSWORD = configs_1.default.PG_PASSWORD, PG_PORT = configs_1.default.PG_PORT;
var pool;
console.log(NODE_ENV);
if (NODE_ENV === 'test') {
    pool = new pg_1.Pool({
        user: PG_USER,
        host: PG_HOST,
        database: PG_DATABASE_TEST,
        password: PG_PASSWORD,
        port: parseInt(PG_PORT)
    });
}
if (NODE_ENV === 'dev') {
    pool = new pg_1.Pool({
        user: PG_USER,
        host: PG_HOST,
        database: PG_DATABASE,
        password: PG_PASSWORD,
        port: parseInt(PG_PORT)
    });
}
exports.default = pool;
