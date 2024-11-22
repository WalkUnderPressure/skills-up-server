"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// [Use as middleware] Check user authorization (now simple, update in future)
const authMiddleware = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ status: 403, message: 'Authorization required!' });
    }
    next();
};
exports.default = authMiddleware;
