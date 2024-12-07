"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRatingModel = exports.PostRatingSchema = void 0;
const mongoose_1 = require("mongoose");
const createModel_1 = __importDefault(require("./lib/createModel"));
const PostRatingSchema = new mongoose_1.Schema({
    rating: { type: Number },
    feedback: { type: String },
    postId: { type: mongoose_1.Schema.ObjectId },
    userId: { type: mongoose_1.Schema.ObjectId },
    createdAt: { type: Number },
});
exports.PostRatingSchema = PostRatingSchema;
const PostRatingModel = (0, createModel_1.default)('posts-ratings', PostRatingSchema);
exports.PostRatingModel = PostRatingModel;
