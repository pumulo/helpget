import express, { Request, Response } from 'express';
import { Individual } from '../../models/Individual-mongoose';
import { individualUrl as baseUrl } from '../../config/end-points';

const router = express.Router();

router.delete(
    `${baseUrl}delete-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Individual by id
        const id = req.params.id;

        const individual = await Individual.findByIdAndDelete(id);
        res.send(individual);
    }
);

export { router as deleteIndividualRouter };