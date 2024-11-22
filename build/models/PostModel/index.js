"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.PostSchema = void 0;
const mongoose_1 = require("mongoose");
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
const PostModel = (0, mongoose_1.model)('posts', PostSchema);
exports.PostModel = PostModel;
