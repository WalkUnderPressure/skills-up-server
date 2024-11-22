"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObject(obj) {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
}
exports.default = isObject;
