"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = getPosts;
const faker_1 = require("@faker-js/faker");
const MockPostDetailsData_1 = require("./MockPostDetailsData");
const randomInArray_1 = __importDefault(require("../../lib/randomInArray"));
const types_1 = require("./types");
function getPosts() {
    var _a;
    const data = { posts: [MockPostDetailsData_1.MockPostDetailsData, MockPostDetailsData_1.MockPostDetailsDataTwo] };
    const addPostsCount = 24;
    for (let i = 0; i < addPostsCount; i++) {
        const userId = (0, randomInArray_1.default)(['1', '2']);
        data.posts.push({
            id: faker_1.faker.string.uuid().slice(0, 8),
            profileId: userId,
            userId: userId,
            title: faker_1.faker.word.words({ count: { min: 3, max: 15 } }),
            subtitle: faker_1.faker.word.words({ count: { min: 3, max: 15 } }),
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/MANNapoli_124545_plato%27s_academy_mosaic.jpg/920px-MANNapoli_124545_plato%27s_academy_mosaic.jpg',
            views: faker_1.faker.number.int({ min: 20, max: 500000 }),
            createdAt: new Date(faker_1.faker.date.anytime()).getTime(),
            tags: [
                (_a = (0, randomInArray_1.default)([types_1.PostTagsMap.SCIENCE, types_1.PostTagsMap.IT, types_1.PostTagsMap.ECONOMICS])) !== null && _a !== void 0 ? _a : types_1.PostTagsMap.SCIENCE,
            ],
            blocks: [
                {
                    id: '1',
                    type: types_1.PostBlockType.TEXT,
                    title: faker_1.faker.word.words({ count: { min: 3, max: 15 } }),
                    paragraphs: [
                        faker_1.faker.lorem.paragraph(),
                        faker_1.faker.lorem.paragraph(),
                        faker_1.faker.lorem.paragraph(),
                        faker_1.faker.lorem.paragraph(),
                    ],
                },
            ],
        });
    }
    return data;
}
