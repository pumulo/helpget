import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Form } from '../models/Form-mongoose';
import { baseUrl } from '../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.post(
    `${baseUrl}create`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Form description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { type, description, values, status } = req.body;
        
        const existingForm = await Form.findOne({ values });

        if (existingForm) {
            console.error(JSON.stringify(existingForm));
            throw new Error('You are attempting to create a duplicate Form');
        }
        const form = Form.build({
            type,
            description,
            values,
            status
        });
        form.save();

        res.status(201).send(form);
    
    }
);

router.post(
    `${baseUrl}batch/json/create`,
    async (req: Request, res: Response) => {
        const { forms }: { forms: any[]} = req.body;

        const addedForms = [];
        for (const nextForm of forms) {
            const { type, description, values, status } = nextForm;
            const existingForm = await Form.findOne({ values });

            if (existingForm) {
                console.error(JSON.stringify(existingForm));
                throw new Error('You are attempting to create a duplicate Form');
            }
            const form = Form.build({
                type,
                description,
                values,
                status
            });
            form.save();
            addedForms.push(form);
        }
        


        res.status(201).send(addedForms);
    
    }
);

export { router as createRouter };