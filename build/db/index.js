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
// Global connection cache
let cachedDbConnection = null;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedDbConnection) {
        // Reuse the existing connection
        return cachedDbConnection;
    }
    const MONGO_URI = process.env.MONGO_URI || "";
    const MONGO_NAME = process.env.MONGO_NAME || "";
    try {
        if (!MONGO_URI)
            throw new Error("MONGO_URI is not defined!");
        if (!MONGO_NAME)
            throw new Error("MONGO_NAME is not defined!");
        // Create a new connection
        const connection = yield mongoose_1.default.connect(MONGO_URI, {
            dbName: MONGO_NAME,
        });
        // Cache the connection
        cachedDbConnection = connection;
        console.info(`>>> MongoDB Connected: ${connection.connection.host}`);
        return cachedDbConnection;
    }
    catch (error) {
        console.error(">>> Failed to connect to MongoDB:", error);
        process.exit(1);
    }
});
// apply plugin to all schemas
mongoose_1.default.plugin(addFieldsTransformer_1.default);
exports.default = connectDB;
