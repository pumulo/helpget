import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Action } from '../../models/Individual-mongoose';
import { organizationUrl as baseUrl } from '../../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.put(
    `${baseUrl}update`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Action description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        let { id, type, description, values, status } = req.body;
        
        // if we find an existing Action, update it
        if (id && id != 'New') {
            const existingAction = await Action.findById(id);

            console.log(JSON.stringify(existingAction));
            if (existingAction) {
                existingAction.values = values;
                existingAction.save();
                res.status(202).send(existingAction);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
        }

        if (!type) {
            type = "Unknown";
        }
        const action = Action.build({
            type,
            description,
            values,
            status
        });
        action.save();

        res.status(201).send(action);
        
    }
);

router.put(
    `${baseUrl}/:type/update`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The action description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const type = req.params.type;
        let { id, description, values, status } = req.body;
        
        // if we find an existing entity, update it
        if (id && id != 'New') {
            const existingAction = await Action.findById(id);

            console.log(JSON.stringify(existingAction));
            if (existingAction) {
                existingAction.values = values;
                existingAction.save();
                res.status(202).send(existingAction);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
        }
        const action = Action.build({
            type,
            description,
            values,
            status
        });
        action.save();

        res.status(201).send(action);
        
    }
);

export { router as updateOrganizationRouter };