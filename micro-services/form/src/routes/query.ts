import express, { Request, Response } from 'express';
import { Form } from '../models/Form-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.get(
    `${baseUrl}query`,
    async (req: Request, res: Response) => {
        // get all forms in the db
        const forms = await Form.find();
        res.send(forms);
    }
);

router.get(
    `${baseUrl}query-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Form by id
        const id = req.params.id;
        if (id === "New") {
            res.send("{}");
        }

        const form = await Form.findById(id);
        res.send(form);
    }
);

router.get(
    `${baseUrl}query-by-parent-id/one-to-one/:parentId`,
    async (req: Request, res: Response) => {
        // get Form by id
        const parentId = req.params.parentId;

        const form = await Form.findOne({
            'values.parentId': parentId
        });
        res.send(form);
    }
);

router.get(
    `${baseUrl}query-by-type/:type`,
    async (req: Request, res: Response) => {
        // get forms by type
        const type = req.params.type;

        const formsByType = await Form.find( { type });
        res.send(formsByType);
    }
);

export { router as queryRouter };