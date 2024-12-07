import { RootFilterQuery, SortOrder } from "mongoose";
import express, { Router } from "express";

import { NotificationModel, NotificationType } from '../models/NotificationModel';
import getUserIdFromHeaders from "../lib/getUserIdFromHeaders";

const router: Router = express.Router();

const DEFAULT_PER_PAGE = 20;
const DEFAULT_PAGE = 1;

// TODO: Add _sort=dt_create&_order=asc
// /notifications/?_limit=10&_page=2
router.get('/', async (req, res) => {
    const {
        _limit = DEFAULT_PER_PAGE, _page = DEFAULT_PAGE,
    } = req.query;

    const userId = getUserIdFromHeaders(req);

    const limit = Number.parseInt(String(_limit)) ?? DEFAULT_PER_PAGE;
    const page = Number.parseInt(String(_page)) ?? DEFAULT_PAGE;
    const skip = Math.max((page - 1) * limit, 0);

    const findQuery: RootFilterQuery<NotificationType> = {
        userId,
    };

    // let sortQuery: Array<[string, SortOrder]> = [];
    // if (_sort && _order) {
    //     sortQuery.push([String(_sort), _order as SortOrder]);
    // }

    const notifications = await NotificationModel
        .find(findQuery)
        // .sort(sortQuery)
        .skip(skip)
        .limit(limit);

    return res.json(notifications);
});

export default router;
