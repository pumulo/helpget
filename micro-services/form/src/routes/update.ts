import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Form } from '../models/Form-mongoose';
import { baseUrl } from '../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.put(
    `${baseUrl}update`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Form description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        let { id, type, description, values, status } = req.body;
        
        // if we find an existing Form, update it
        if (id && id != 'New') {
            const existingForm = await Form.findById(id);

            console.log(JSON.stringify(existingForm));
            if (existingForm) {
                existingForm.values = values;
                existingForm.save();
                res.status(202).send(existingForm);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
        }

        if (!type) {
            type = "Unknown";
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

router.put(
    `${baseUrl}/:type/update`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Form description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const type = req.params.type;
        let { id, description, values, status } = req.body;
        
        // if we find an existing Form, update it
        if (id && id != 'New') {
            const existingForm = await Form.findById(id);

            console.log(JSON.stringify(existingForm));
            if (existingForm) {
                existingForm.values = values;
                existingForm.save();
                res.status(202).send(existingForm);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
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

export { router as updateRouter };