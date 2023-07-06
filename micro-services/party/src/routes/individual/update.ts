import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Individual } from '../../models/Individual-mongoose';
import { individualUrl as baseUrl } from '../../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.put(
    `${baseUrl}update`,
    [
        body('firstName').notEmpty()
            .withMessage('First Name is a required field'),
        body('lastName').notEmpty()
            .withMessage('Last Name is a required field'),
        body('contactInfo').notEmpty()
            .withMessage('Contact information is a required to create an individual'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        let { 
            id,
            firstName,
            middleName,
            lastName,
            contactInfo,
            description,
            values,
            status,
        } = req.body;
        
        // if we find an existing Individual, update it
        if (id && id != 'New') {
            const existingIndividual = await Individual.findById(id);

            console.log(JSON.stringify(existingIndividual));
            if (existingIndividual) {
                existingIndividual.values = values;
                existingIndividual.save();
                res.status(202).send(existingIndividual);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
        }
        const individual = Individual.build({ 
            firstName,
            middleName,
            lastName,
            contactInfo,
            description,
            values,
            status,
        });
        individual.save();

        res.status(201).send(individual);
        
    }
);

router.put(
    `${baseUrl}/:type/update`,
    [
        body('firstName').notEmpty()
            .withMessage('First Name is a required field'),
        body('lastName').notEmpty()
            .withMessage('Last Name is a required field'),
        body('contactInfo').notEmpty()
            .withMessage('Contact information is a required to create an individual'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const type = req.params.type;
        let {
            id,
            firstName,
            middleName,
            lastName,
            contactInfo,
            description,
            values,
            status,
        } = req.body;
        
        // if we find an existing entity, update it
        if (id && id != 'New') {
            const existingIndividual = await Individual.findById(id);

            console.log(JSON.stringify(existingIndividual));
            if (existingIndividual) {
                existingIndividual.values = values;
                existingIndividual.save();
                res.status(202).send(existingIndividual);
            }
        }
        //otherwise create a new one
        if (!status) {
            status = "New_UnknownStatus";
        }
        const individual = Individual.build({ 
            firstName,
            middleName,
            lastName,
            contactInfo,
            description,
            values,
            status,
        });
        individual.save();

        res.status(201).send(individual);
        
    }
);

export { router as updateIndividualRouter };