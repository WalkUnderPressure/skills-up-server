import express, { Router } from "express";

import { CommentModel } from '../models/CommentModel';

const router: Router = express.Router();

// /comments/?postId=:postId
router.get('/', async (req, res, next) => {
    const { postId } = req.query;

    if (!postId) {
        return next();
    }

    const comments = await CommentModel.find({ postId }).populate('profile');

    return res.json(comments);
});

// /comments/
router.post('/', async (req, res) => {
    const commentData: {
        text: string,
        postId: string,
        userId: string,
    } = req.body;

    const savedComment = await (await CommentModel.create(commentData)).populate('profile');

    return res.json(savedComment);
});

export default router;
