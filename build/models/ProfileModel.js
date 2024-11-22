"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = exports.ProfileSchema = void 0;
const mongoose_1 = require("mongoose");
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
const ProfileModel = (0, mongoose_1.model)('profiles', ProfileSchema);
exports.ProfileModel = ProfileModel;
