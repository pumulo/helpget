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


router.get(
    `${baseUrl}create/about`,
    (req: Request, res: Response) => {
        const resp = `
            <h1>Create Entity microservice!!!!</h1>
            <p>
                Creaed by <em>Pumulo Sikaneta</em>.</br>
                Utilizes:
                <ul>
                    <li>
                        node.js including the following libraries:
                        <ul>
                            <li>
                                mongoose (mongo dd)
                            </li>
                            <li>
                                exrpress (web server)
                            </li>
                        </ul>
                    </li>
                    <li>
                        Docker
                    </li>
                    <li>
                        Kubernetes
                    </li>
                    <li>
                        Skaffold
                    </li>
                </ul>
            </p>
            Created as a template for publishing services from a public site for use in simutlations. This template can be used to create any Object by changing the properties and name of the Entity.</br>
            <em>Initial create date - Marh, 2023.</em>
        `;
        res.send(
            resp
        )
    }
);


export { router as createRouter };