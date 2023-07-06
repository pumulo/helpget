import express, { Request, Response } from 'express';
import { Action } from '../../models/Group-mongoos';
import { groupUrl as baseUrl } from '../../config/end-points';

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

export { router as deleteGroupRouter };