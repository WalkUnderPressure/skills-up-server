"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
const createModel_1 = __importDefault(require("../lib/createModel"));
const PostSchema = new mongoose_1.Schema({
    title: { type: String },
    subtitle: { type: String },
    img: { type: String },
    views: { type: Number },
    createdAt: { type: Number },
    tags: { type: (Array) },
    blocks: { type: (Array) },
    userId: { type: mongoose_1.Schema.ObjectId },
});
exports.PostSchema = PostSchema;
// Define virtual for population
PostSchema.virtual('profile', {
    ref: 'profiles',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true,
});
PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });
// const PostModel = model('posts', PostSchema);
const PostModel = (0, createModel_1.default)('posts', PostSchema);
exports.PostModel = PostModel;
