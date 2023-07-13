import express, { Request, Response } from 'express';
import { Individual } from '../../models/Individual-mongoose';
import { individualUrl as baseUrl } from '../../config/end-points';

const router = express.Router();

router.get(
    `${baseUrl}query`,
    async (req: Request, res: Response) => {
        // get all entities in the db
        const individuals = await Individual.find();
        res.send(individuals);
    }
);

router.get(
    `${baseUrl}query-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Individual by id
        const id = req.params.id;
        if (id === "New") {
            res.send("{}");
        }

        const individuals = await Individual.findById(id);
        res.send(individuals);
    }
);

router.get(
    `${baseUrl}query-by-email`,
    async (req: Request, res: Response) => {
        // get Individual by email
        const email = req.query.email;

        const individuals = await Individual.findOne({ 'contactInfo.email.1': email });
        res.send(individuals);
    }
);

router.get(
    `${baseUrl}query-by-name`,
    async (req: Request, res: Response) => {
        // get Individual by email
        const name = req.query.name;
        console.log(`query by ${name}`);

        const individuals = await Individual.findOne({ lastNName: name });
        res.send(individuals);
    }
);

router.get(
    `${baseUrl}query-by-parent-id/one-to-one/:parentId`,
    async (req: Request, res: Response) => {
        // get Individual by id
        const parentId = req.params.parentId;

        const individuals = await Individual.findOne({
            'values.parentId': parentId
        });
        res.send(individuals);
    }
);

router.get(
    `${baseUrl}query-by-type/:type`,
    async (req: Request, res: Response) => {
        // get Individuals by type
        const type = req.params.type;

        const individualsByType = await Individual.find( { type });
        res.send(individualsByType);
    }
);

export { router as queryIndividualRouter };