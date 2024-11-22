"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String },
});
exports.UserSchema = UserSchema;
const UserModel = (0, mongoose_1.model)('users', UserSchema);
exports.UserModel = UserModel;
