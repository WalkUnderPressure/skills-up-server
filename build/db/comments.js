"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = getComments;
function getComments() {
    const data = {
        comments: [
            {
                id: '1',
                text: 'Cool post about modern JS',
                postId: '1',
                userId: '1',
                profileId: '1',
            },
            {
                id: '2',
                text: 'Great job! Thanks!',
                postId: '1',
                userId: '2',
                profileId: '2',
            },
        ],
    };
    return data;
}
