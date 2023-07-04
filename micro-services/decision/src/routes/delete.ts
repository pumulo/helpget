import express, { Request, Response } from 'express';
import { Decision } from '../models/Decision-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.delete(
    `${baseUrl}delete-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Decision by id
        const id = req.params.id;

        const decision = await Decision.findByIdAndDelete(id);
        res.send(decision);
    }
);

export { router as deleteRouter };