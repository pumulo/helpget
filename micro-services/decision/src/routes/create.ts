import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Decision } from '../models/Decision-mongoose';
import { baseUrl } from '../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.post(
    `${baseUrl}create`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Decision description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { type, description, values, status } = req.body;
        
        const existingDecision = await Decision.findOne({ values });

        if (existingDecision) {
            console.error(JSON.stringify(existingDecision));
            throw new Error('You are attempting to create a duplicate Decision');
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

router.post(
    `${baseUrl}batch/json/create`,
    async (req: Request, res: Response) => {
        const { Decisions }: { Decisions: any[]} = req.body;

        const addedDecisions = [];
        for (const nextDecision of Decisions) {
            const { type, description, values, status } = nextDecision;
            const existingDecision = await Decision.findOne({ values });

            if (existingDecision) {
                console.error(JSON.stringify(existingDecision));
                throw new Error('You are attempting to create a duplicate Decision');
            }
            const decision = Decision.build({
                type,
                description,
                values,
                status
            });
            decision.save();
            addedDecisions.push(decision);
        }
        


        res.status(201).send(addedDecisions);
    
    }
);

export { router as createRouter };