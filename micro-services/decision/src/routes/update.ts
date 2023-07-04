import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Decision } from '../models/Decision-mongoose';
import { baseUrl } from '../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.put(
    `${baseUrl}update`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Decision description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        let { id, type, description, values, status } = req.body;
        
        // if we find an existing Decision, update it
        if (id && id != 'New') {
            const existingDecision = await Decision.findById(id);

            console.log(JSON.stringify(existingDecision));
            if (existingDecision) {
                existingDecision.values = values;
                existingDecision.save();
                res.status(202).send(existingDecision);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
        }

        if (!type) {
            type = "Unknown";
        }
        const decision = Decision.build({
            type,
            description,
            values,
            status
        });
        decision.save();

        res.status(201).send(decision);
        
    }
);

router.put(
    `${baseUrl}/:type/update`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Decision description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const type = req.params.type;
        let { id, description, values, status } = req.body;
        
        // if we find an existing entity, update it
        if (id && id != 'New') {
            const existingDecision = await Decision.findById(id);

            console.log(JSON.stringify(existingDecision));
            if (existingDecision) {
                existingDecision.values = values;
                existingDecision.save();
                res.status(202).send(existingDecision);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
        }
        const decision = Decision.build({
            type,
            description,
            values,
            status
        });
        decision.save();

        res.status(201).send(decision);
        
    }
);

export { router as updateRouter };