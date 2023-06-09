import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Entity } from '../models/Entity-mongoose';
import { baseUrl } from '../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.post(
    `${baseUrl}create`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Entity description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { type, description, values, status } = req.body;
        
        const existingEntity = await Entity.findOne({ values });

        if (existingEntity) {
            console.error(JSON.stringify(existingEntity));
            throw new Error('You are attempting to create a duplicate Entity');
        }
        const entity = Entity.build({
            type,
            description,
            values,
            status
        });
        entity.save();

        res.status(201).send(entity);
    
    }
);

router.post(
    `${baseUrl}batch/json/create`,
    async (req: Request, res: Response) => {
        const { entities }: { entities: any[]} = req.body;

        const addedEntities = [];
        for (const nextEntity of entities) {
            const { type, description, values, status } = nextEntity;
            const existingEntity = await Entity.findOne({ values });

            if (existingEntity) {
                console.error(JSON.stringify(existingEntity));
                throw new Error('You are attempting to create a duplicate Entity');
            }
            const entity = Entity.build({
                type,
                description,
                values,
                status
            });
            entity.save();
            addedEntities.push(entity);
        }
        


        res.status(201).send(addedEntities);
    
    }
);

export { router as createRouter };