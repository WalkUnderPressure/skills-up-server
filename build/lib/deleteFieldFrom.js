"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteFieldFrom = (object, attr) => {
    const newObject = Object.assign({}, object);
    if (attr in newObject) {
        delete newObject[attr];
    }
    return newObject;
};
exports.default = deleteFieldFrom;
