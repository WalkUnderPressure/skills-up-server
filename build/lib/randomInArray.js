"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function randomInArray(values) {
    var _a;
    const index = parseInt(String(Math.random() * values.length));
    return (_a = values.at(index)) !== null && _a !== void 0 ? _a : undefined;
}
exports.default = randomInArray;
