import express, { Router } from "express";
import bcrypt from 'bcrypt';

import deleteFieldFrom from "../lib/deleteFieldFrom";
import { UserModel } from "../models/UserModel";

const router: Router = express.Router();

// /auth/sign-in/
router.post('/sign-in/', async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    let isDataValid = false;
    let response: unknown = {
        status: 403,
        message: 'User with provided credentials not found!'
    }

    if (user) {
        isDataValid = bcrypt.compareSync(password, user?.password ?? '');

        if (isDataValid) {
            response = deleteFieldFrom(user.toObject(), 'password');
        }
    }

    return res.json(response);
});

export default router;