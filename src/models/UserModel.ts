import { Schema, model } from 'mongoose';

import createModel from './lib/createModel';

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    roles: { type: [String] },
});

// const UserModel = model('users', UserSchema);
const UserModel = createModel('users', UserSchema);

export { UserSchema, UserModel };
