"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUserIdFromHeaders = (req) => {
    const authHeader = req.headers.authorization;
    const userId = authHeader && authHeader.split(' ')[1];
    return userId;
};
exports.default = getUserIdFromHeaders;
