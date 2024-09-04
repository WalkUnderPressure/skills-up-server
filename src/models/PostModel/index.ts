import { Schema, model } from 'mongoose';

import PostBlock from './PostBlock';

type PostType = {
    title: string;
    subtitle: string;
    img: string;
    views: number;
    createdAt: number;
    tags: Array<string>;
    blocks: Array<PostBlock>;
    userId: string;
}

const PostSchema = new Schema({
    title: { type: String },
    subtitle: { type: String },
    img: { type: String },
    views: { type: Number },
    createdAt: { type: Number },
    tags: { type: Array<String> },
    blocks: { type: Array<PostBlock> },
    userId: { type: Schema.ObjectId },
});

// Define virtual for population
PostSchema.virtual('profile', {
    ref: 'profiles',
    localField: 'userId',
    foreignField: 'userId',
    justOne: true,
});
PostSchema.set('toObject', { virtuals: true });
PostSchema.set('toJSON', { virtuals: true });

const PostModel = model('posts', PostSchema);

export { PostSchema, PostModel, PostType };
