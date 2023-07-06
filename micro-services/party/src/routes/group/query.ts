import express, { Request, Response } from 'express';
import { Action } from '../../models/Group-mongoos';
import { groupUrl as baseUrl } from '../../config/end-points';

const router = express.Router();

router.get(
    `${baseUrl}query`,
    async (req: Request, res: Response) => {
        // get all entities in the db
        const actions = await Action.find();
        res.send(actions);
    }
);

router.get(
    `${baseUrl}query-by-id/:id`,
    async (req: Request, res: Response) => {
        // get Action by id
        const id = req.params.id;
        if (id === "New") {
            res.send("{}");
        }

        const action = await Action.findById(id);
        res.send(action);
    }
);

router.get(
    `${baseUrl}query-by-parent-id/one-to-one/:parentId`,
    async (req: Request, res: Response) => {
        // get action by id
        const parentId = req.params.parentId;

        const action = await Action.findOne({
            'values.parentId': parentId
        });
        res.send(action);
    }
);

router.get(
    `${baseUrl}query-by-type/:type`,
    async (req: Request, res: Response) => {
        // get actions by type
        const type = req.params.type;

        const actionsByType = await Action.find( { type });
        res.send(actionsByType);
    }
);

export { router as queryGroupRouter };