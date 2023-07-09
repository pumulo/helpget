import express, { Request, Response } from 'express';
import { Form } from '../models/Form-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.delete(
    `${baseUrl}delete-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Form by id
        const id = req.params.id;

        const form = await Form.findByIdAndDelete(id);
        res.send(form);
    }
);

export { router as deleteRouter };