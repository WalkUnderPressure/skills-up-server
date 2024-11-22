"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommentModel_1 = require("../models/CommentModel");
const router = express_1.default.Router();
// /comments/?postId=:postId
router.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.query;
    if (!postId) {
        return next();
    }
    const comments = yield CommentModel_1.CommentModel.find({ postId }).populate('profile');
    return res.json(comments);
}));
// /comments/
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentData = req.body;
    const savedComment = yield (yield CommentModel_1.CommentModel.create(commentData)).populate('profile');
    return res.json(savedComment);
}));
exports.default = router;
