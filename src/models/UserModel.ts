import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    role: { type: String },
});

const UserModel = model('users', UserSchema);

export { UserSchema, UserModel };
