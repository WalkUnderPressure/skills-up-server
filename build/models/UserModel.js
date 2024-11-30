"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const createModel_1 = __importDefault(require("./lib/createModel"));
const UserSchema = new mongoose_1.Schema({
    username: { type: String },
    password: { type: String },
    roles: { type: [String] },
});
exports.UserSchema = UserSchema;
// const UserModel = model('users', UserSchema);
const UserModel = (0, createModel_1.default)('users', UserSchema);
exports.UserModel = UserModel;
