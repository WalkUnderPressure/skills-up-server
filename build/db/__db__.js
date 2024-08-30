"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profiles_1 = require("./profiles");
const comments_1 = require("./comments");
const posts_1 = require("./Posts/posts");
const users_1 = require("./users");
function getDB() {
    const data = Object.assign(Object.assign(Object.assign(Object.assign({}, (0, users_1.getUsers)()), (0, profiles_1.getProfiles)()), (0, posts_1.getPosts)()), (0, comments_1.getComments)());
    return data;
}
exports.default = getDB;
