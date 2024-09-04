import express, { Router } from "express";

import { ProfileModel } from '../models/ProfileModel';

const router: Router = express.Router();

// /profiles/:userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params

    const profile = await ProfileModel.findOne({ userId: userId });

    return res.json(profile);
});

// /profiles/:profileId
router.patch('/:profileId', async (req, res) => {
    const { profileId } = req.params;
    const updateProfileData = req.body;
  
    const profile = await ProfileModel.findOneAndUpdate(
      { _id: profileId },
      { $set: updateProfileData },
      { upsert: false, returnDocument: 'after' }
    );

    return res.json(profile);
});

export default router;
