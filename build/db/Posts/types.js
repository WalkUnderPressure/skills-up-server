"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostBlockType = exports.PostTagsMap = void 0;
var PostBlockType;
(function (PostBlockType) {
    PostBlockType["CODE"] = "CODE";
    PostBlockType["IMAGE"] = "IMAGE";
    PostBlockType["TEXT"] = "TEXT";
})(PostBlockType || (exports.PostBlockType = PostBlockType = {}));
const PostTagsMap = Object.freeze({
    ALL: 'ALL',
    IT: 'IT',
    SCIENCE: 'SCIENCE',
    ECONOMICS: 'ECONOMICS',
});
exports.PostTagsMap = PostTagsMap;
