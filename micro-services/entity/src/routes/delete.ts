import express, { Request, Response } from 'express';
import { Entity } from '../models/Entity-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.delete(
    `${baseUrl}delete-by-id/:id`,
    async (req: Request, res: Response) => {
        // get entity by id
        const id = req.params.id;

        const entity = await Entity.findByIdAndDelete(id);
        res.send(entity);
    }
);

export { router as deleteRouter };