"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = getUsers;
function getUsers() {
    const data = {
        users: [
            {
                id: '1',
                username: 'admin',
                password: 'admin',
                role: 'ADMIN',
            },
            {
                id: '2',
                username: 'user',
                password: 'user',
                role: 'USER',
            },
        ],
    };
    return data;
}
