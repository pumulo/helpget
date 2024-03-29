import express, { Request, Response } from 'express';
import { Action } from '../models/Action-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.delete(
    `${baseUrl}delete-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Action by id
        const id = req.params.id;

        const action = await Action.findByIdAndDelete(id);
        res.send(action);
    }
);

router.delete(
    `${baseUrl}delete-by-name/:name`,
    async (req: Request, res: Response) => {
        // get Action by id
        const name = req.params.name;

        const action = await Action.findOneAndDelete({ name });
        res.send(action);
    }
);

export { router as deleteRouter };