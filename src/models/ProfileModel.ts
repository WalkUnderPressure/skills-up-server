import { Schema, model } from 'mongoose';

const ProfileSchema = new Schema({
    userId: { type: Schema.ObjectId },
    username: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    currency: { type: String },
    country: { type: String },
    city: { type: String },
    avatar: { type: String },
});

const ProfileModel = model('profiles', ProfileSchema);

export { ProfileSchema, ProfileModel };
