"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = exports.ProfileSchema = void 0;
const mongoose_1 = require("mongoose");
const createModel_1 = __importDefault(require("./lib/createModel"));
const ProfileSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.ObjectId },
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    currency: { type: String },
    country: { type: String },
    city: { type: String },
    avatar: { type: String },
});
exports.ProfileSchema = ProfileSchema;
// const ProfileModel = model('profiles', ProfileSchema);
const ProfileModel = (0, createModel_1.default)('profiles', ProfileSchema);
exports.ProfileModel = ProfileModel;
