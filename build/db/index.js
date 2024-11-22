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
const mongoose_1 = __importDefault(require("mongoose"));
const addFieldsTransformer_1 = __importDefault(require("./decorator/addFieldsTransformer"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const DB_CONNECTION_URI = process.env.MONGO_URI || "";
    const DB_NAME = process.env.MONGO_NAME || "";
    try {
        const conn = yield mongoose_1.default.connect(DB_CONNECTION_URI, {
            dbName: DB_NAME,
        });
        console.info(`>>> MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
});
// apply plugin to all schemas
mongoose_1.default.plugin(addFieldsTransformer_1.default);
exports.default = connectDB;
