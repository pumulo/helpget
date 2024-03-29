import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Action } from '../models/Action-mongoose';
import { baseUrl } from '../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.post(
    `${baseUrl}create`,
    [
        body('name').notEmpty()
            .withMessage('All actions require a name'),
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Action description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { type, name, description, values, status } = req.body;
        
        const existingAction = await Action.findOne({ values });

        if (existingAction) {
            console.error(JSON.stringify(existingAction));
            throw new Error('You are attempting to create a duplicate Action');
        }
        const action = Action.build({
            type,
            name,
            description,
            values,
            status
        });
        action.save();

        res.status(201).send(action);
    
    }
);

router.post(
    `${baseUrl}batch/json/create`,
    async (req: Request, res: Response) => {
        const { actions }: { actions: any[]} = req.body;

        const addedActions = [];
        for (const nextAction of actions) {
            const { type, name, description, values, status } = nextAction;
            const existingAction = await Action.findOne({ values });

            if (existingAction) {
                console.error(JSON.stringify(existingAction));
                throw new Error('You are attempting to create a duplicate action');
            }
            const action = Action.build({
                type,
                name,
                description,
                values,
                status
            });
            action.save();
            addedActions.push(action);
        }
        


        res.status(201).send(addedActions);
    
    }
);

export { router as createRouter };