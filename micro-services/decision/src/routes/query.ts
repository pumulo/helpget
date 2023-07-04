import express, { Request, Response } from 'express';
import { Decision } from '../models/Decision-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.get(
    `${baseUrl}query`,
    async (req: Request, res: Response) => {
        // get all entities in the db
        const decisions = await Decision.find();
        res.send(decisions);
    }
);

router.get(
    `${baseUrl}query-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Decision by id
        const id = req.params.id;
        if (id === "New") {
            res.send("{}");
        }

        const decision = await Decision.findById(id);
        res.send(decision);
    }
);

router.get(
    `${baseUrl}query-by-parent-id/one-to-one/:parentId`,
    async (req: Request, res: Response) => {
        // get Decision by id
        const parentId = req.params.parentId;

        const decision = await Decision.findOne({
            'values.parentId': parentId
        });
        res.send(decision);
    }
);

router.get(
    `${baseUrl}query-by-type/:type`,
    async (req: Request, res: Response) => {
        // get Decisions by type
        const type = req.params.type;

        const decisionsByType = await Decision.find( { type });
        res.send(decisionsByType);
    }
);

export { router as queryRouter };