import express, { Request, Response } from 'express';
import { Entity } from '../models/Entity-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

router.get(
    `${baseUrl}query`,
    async (req: Request, res: Response) => {
        // get all entities in the db
        const entities = await Entity.find();
        res.send(entities);
    }
);

router.get(
    `${baseUrl}query-by-id/:id`,
    async (req: Request, res: Response) => {
        // get entity by id
        const id = req.params.id;

        const entity = await Entity.findById(id);
        res.send(entity);
    }
);
router.get(
    `${baseUrl}query-by-type/:type`,
    async (req: Request, res: Response) => {
        // get entities by type
        const type = req.params.type;

        const entitiesByType = await Entity.find( { type });
        res.send(entitiesByType);
    }
);

export { router as queryRouter };