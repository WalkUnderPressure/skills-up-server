import { RootFilterQuery, SortOrder } from "mongoose";
import express, { Router } from "express";

import { PostModel, PostType } from '../models/PostModel';

const router: Router = express.Router();

// /posts/tmp
router.get('/tmp/', async (req, res) => {
    return res.json([
        { uid: 1, name: 'tmp post 1' },
        { uid: 2, name: 'tmp post 2' },
    ]);
});

// /posts/:postId
router.get('/:postId', async (req, res) => {
    const { postId } = req.params;

    const post = await PostModel.findOne({ _id: postId }).populate('profile');

    return res.json(post);
});

const DEFAULT_PER_PAGE = 20;
const DEFAULT_PAGE = 1;

// /posts/?_limit=10&_page=2&_sort=views&_order=asc&tags=IT&q=async
router.get('/', async (req, res) => {
    const {
        _limit = DEFAULT_PER_PAGE, _page = DEFAULT_PAGE,
        _sort = '', _order = 'asc',
        tags = [], q = '',
    } = req.query;

    const limit = Number.parseInt(String(_limit)) ?? DEFAULT_PER_PAGE;
    const page = Number.parseInt(String(_page)) ?? DEFAULT_PAGE;
    const skip = (page - 1) * limit;

    const findQuery: RootFilterQuery<PostType> = {};
    let sortQuery: Array<[string, SortOrder]> = [];

    if (tags.length) {
        findQuery.tags = { $in: tags };
    }

    if (q) {
        findQuery.$or = [
            { title: { $regex: q, $options: 'i' } },
            { subtitle: { $regex: q, $options: 'i' } },
        ]
    }

    if (_sort && _order) {
        sortQuery.push([String(_sort), _order as SortOrder]);
    }

    const posts = await PostModel
        .find(findQuery)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .populate('profile');

    return res.json(posts);
});

export default router;
