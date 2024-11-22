"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const createModel_1 = __importDefault(require("./lib/createModel"));
const CommentSchema = new mongoose_1.Schema({
    text: { type: String },
    postId: { type: mongoose_1.Schema.ObjectId },
    userId: { type: mongoose_1.Schema.ObjectId },
    // Use one of methods this or virtual
    // "profile": { type: Schema.Types.ObjectId, ref: 'profiles' },
    // then you should store profileId in "profile" field
});
// Define virtual for population
CommentSchema.virtual('profile', {
    ref: 'profiles',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true,
});
CommentSchema.set('toObject', { virtuals: true });
CommentSchema.set('toJSON', { virtuals: true });
// const CommentModel = model('comments', CommentSchema);
const CommentModel = (0, createModel_1.default)('comments', CommentSchema);
exports.CommentModel = CommentModel;
