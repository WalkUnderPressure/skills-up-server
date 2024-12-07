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
const PostRatingModel_1 = require("../models/PostRatingModel");
const getUserIdFromHeaders_1 = __importDefault(require("../lib/getUserIdFromHeaders"));
const router = express_1.default.Router();
// /post-rating/:postId
router.get('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const userId = (0, getUserIdFromHeaders_1.default)(req);
    const findQuery = {
        userId,
        postId,
    };
    const postRating = yield PostRatingModel_1.PostRatingModel.findOne(findQuery);
    return res.json(postRating);
}));
// /post-rating/:postId
router.post('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { postId } = req.params;
    const userId = (0, getUserIdFromHeaders_1.default)(req);
    if (!userId || !postId) {
        return res.json({
            status: 400,
            message: "Can't create post rating object with provided data. PostId or UserId invalid!"
        });
    }
    const postRatingData = req.body;
    postRatingData.userId = userId;
    postRatingData.postId = postId;
    postRatingData.rating = (_a = postRatingData.rating) !== null && _a !== void 0 ? _a : 0;
    postRatingData.feedback = (_b = postRatingData.feedback) !== null && _b !== void 0 ? _b : '';
    const postRating = yield PostRatingModel_1.PostRatingModel.create(postRatingData);
    return res.json(postRating);
}));
exports.default = router;
