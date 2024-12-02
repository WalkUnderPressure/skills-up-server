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
const NotificationModel_1 = require("../models/NotificationModel");
const router = express_1.default.Router();
const DEFAULT_PER_PAGE = 20;
const DEFAULT_PAGE = 1;
// TODO: Add _sort=dt_create&_order=asc
// /notifications/?_limit=10&_page=2
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { _limit = DEFAULT_PER_PAGE, _page = DEFAULT_PAGE, } = req.query;
    const authHeader = req.headers.authorization;
    const userId = authHeader && authHeader.split(' ')[1];
    const limit = (_a = Number.parseInt(String(_limit))) !== null && _a !== void 0 ? _a : DEFAULT_PER_PAGE;
    const page = (_b = Number.parseInt(String(_page))) !== null && _b !== void 0 ? _b : DEFAULT_PAGE;
    const skip = Math.max((page - 1) * limit, 0);
    const findQuery = {
        userId,
    };
    // let sortQuery: Array<[string, SortOrder]> = [];
    // if (_sort && _order) {
    //     sortQuery.push([String(_sort), _order as SortOrder]);
    // }
    const notifications = yield NotificationModel_1.NotificationModel
        .find(findQuery)
        // .sort(sortQuery)
        .skip(skip)
        .limit(limit);
    return res.json(notifications);
}));
exports.default = router;
