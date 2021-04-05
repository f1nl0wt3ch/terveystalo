"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var mysql2_1 = __importDefault(require("mysql2"));
var DatabaseConfig_1 = require("../config/DatabaseConfig");
exports.db = mysql2_1.default.createConnection({
    host: DatabaseConfig_1.DatabaseConfig.HOST,
    user: DatabaseConfig_1.DatabaseConfig.USER,
    password: DatabaseConfig_1.DatabaseConfig.PASSWORD,
    database: DatabaseConfig_1.DatabaseConfig.DATABASE
});
