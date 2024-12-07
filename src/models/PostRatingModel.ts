import { Schema } from 'mongoose';

import createModel from './lib/createModel';

type PostRatingType = {
    id: string;
    rating: number;
    feedback: string;
    userId: string;
    postId: string;
    createdAt: number;
}

const PostRatingSchema = new Schema({
    rating: { type: Number },
    feedback: { type: String },
    postId: { type: Schema.ObjectId },
    userId: { type: Schema.ObjectId },
    createdAt: { type: Number },
});

const PostRatingModel = createModel('posts-ratings', PostRatingSchema);

export { PostRatingSchema, PostRatingModel, PostRatingType };
