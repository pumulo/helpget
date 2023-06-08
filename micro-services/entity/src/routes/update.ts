import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Entity } from '../models/Entity-mongoose';
import { baseUrl } from '../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.put(
    `${baseUrl}update`,
    [
        body('description').trim().isLength(
                {max: 2000}
        ).withMessage(
            'The Entity description cannot be longer than 2000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { id, type, description, values, status } = req.body;
        
        // if we find an existing entity, update it
        if (id) {
            const existingEntity = await Entity.findById(id);

            if (existingEntity) {
                existingEntity.values = values;
                existingEntity.save();
                res.status(202).send(existingEntity);
            } else {
                res.status(500).send('Unable to update existing entity');
                throw new Error('Unable to update existing entity');
            }
        }

        //otherwise create a new one
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


export { router as updateRouter };