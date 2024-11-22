"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const createModel = (schemaName, schema) => {
    return mongoose_1.default.models[schemaName] || mongoose_1.default.model(schemaName, schema);
};
exports.default = createModel;
