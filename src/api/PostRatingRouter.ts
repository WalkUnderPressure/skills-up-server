import { RootFilterQuery } from "mongoose";
import express, { Router } from "express";

import { PostRatingModel, PostRatingType } from '../models/PostRatingModel';
import getUserIdFromHeaders from "../lib/getUserIdFromHeaders";

const router: Router = express.Router();

// /post-rating/:postId
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    const userId = getUserIdFromHeaders(req);

    const findQuery: RootFilterQuery<PostRatingType> = {
        userId,
        postId,
    };

    const postRating = await PostRatingModel.findOne(findQuery);

    return res.json(postRating);
});

// /post-rating/:postId
router.post('/:postId', async (req, res) => {
    const { postId } = req.params;

    const userId = getUserIdFromHeaders(req);

    if (!userId || !postId) {
        return res.json({
            status: 400,
            message: "Can't create post rating object with provided data. PostId or UserId invalid!"
        });
    }

    const postRatingData: PostRatingType = req.body;

    postRatingData.userId = userId;
    postRatingData.postId = postId;
    postRatingData.rating = postRatingData.rating ?? 0;
    postRatingData.feedback = postRatingData.feedback ?? '';

    const postRating = await PostRatingModel.create(postRatingData);

    return res.json(postRating);
});

export default router;
