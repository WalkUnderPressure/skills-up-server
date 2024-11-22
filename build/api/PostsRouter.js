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
const PostModel_1 = require("../models/PostModel");
const router = express_1.default.Router();
// /posts/:postId
router.get('/:postId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    const post = yield PostModel_1.PostModel.findOne({ _id: postId }).populate('profile');
    return res.json(post);
}));
const DEFAULT_PER_PAGE = 20;
const DEFAULT_PAGE = 1;
// /posts/?_limit=10&_page=2&_sort=views&_order=asc&tags=IT&q=async
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { _limit = DEFAULT_PER_PAGE, _page = DEFAULT_PAGE, _sort = '', _order = 'asc', tags = [], q = '', } = req.query;
    const limit = (_a = Number.parseInt(String(_limit))) !== null && _a !== void 0 ? _a : DEFAULT_PER_PAGE;
    const page = (_b = Number.parseInt(String(_page))) !== null && _b !== void 0 ? _b : DEFAULT_PAGE;
    const skip = (page - 1) * limit;
    const findQuery = {};
    let sortQuery = [];
    if (tags.length) {
        findQuery.tags = { $in: tags };
    }
    if (q) {
        findQuery.$or = [
            { title: { $regex: q, $options: 'i' } },
            { subtitle: { $regex: q, $options: 'i' } },
        ];
    }
    if (_sort && _order) {
        sortQuery.push([String(_sort), _order]);
    }
    const posts = yield PostModel_1.PostModel
        .find(findQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .populate('profile');
    return res.json(posts);
}));
exports.default = router;
