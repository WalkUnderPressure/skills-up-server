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
const bcrypt_1 = __importDefault(require("bcrypt"));
const deleteFieldFrom_1 = __importDefault(require("../lib/deleteFieldFrom"));
const UserModel_1 = require("../models/UserModel");
const ProfileModel_1 = require("../models/ProfileModel");
const router = express_1.default.Router();
// /auth/sign-in/
router.post('/sign-in/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { username, password } = req.body;
    const user = yield UserModel_1.UserModel.findOne({ username });
    let isDataValid = false;
    let response = {
        status: 403,
        message: 'User with provided credentials not found!'
    };
    if (user) {
        isDataValid = bcrypt_1.default.compareSync(password, (_a = user === null || user === void 0 ? void 0 : user.password) !== null && _a !== void 0 ? _a : '');
        if (isDataValid) {
            const profile = yield ProfileModel_1.ProfileModel.findOne({ userId: user._id });
            response = (0, deleteFieldFrom_1.default)(Object.assign(Object.assign({}, user.toObject()), { avatar: (_b = profile.avatar) !== null && _b !== void 0 ? _b : '' }), 'password');
        }
    }
    return res.json(response);
}));
exports.default = router;
