"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModel = exports.NotificationSchema = void 0;
const mongoose_1 = require("mongoose");
const createModel_1 = __importDefault(require("./lib/createModel"));
const NotificationSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.ObjectId },
    title: { type: String },
    description: { type: String },
    href: { type: String },
    createdAt: { type: Number },
});
exports.NotificationSchema = NotificationSchema;
const NotificationModel = (0, createModel_1.default)('notifications', NotificationSchema);
exports.NotificationModel = NotificationModel;
