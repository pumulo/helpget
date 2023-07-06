import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Individual } from '../../models/Individual-mongoose';
import { individualUrl as baseUrl } from '../../config/end-points';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;
const router = express.Router();

router.post(
    `${baseUrl}create`,
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
        const { 
            firstName,
            middleName,
            lastName,
            contactInfo,
            description,
            values,
            status,
        } = req.body;
        
        const existingIndividual = await Individual.findOne({ values });

        if (existingIndividual) {
            console.error(JSON.stringify(existingIndividual));
            throw new Error('You are attempting to create a duplicate Individual');
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

router.post(
    `${baseUrl}batch/json/create`,
    async (req: Request, res: Response) => {
        const { individuals }: { individuals: any[]} = req.body;

        const addedIndividuals = [];
        for (const nextIndividual of individuals) {
            const { 
                firstName,
                middleName,
                lastName,
                contactInfo,
                description,
                values,
                status
            } = nextIndividual;
            const existingIndividual = await Individual.findOne({ values });

            if (existingIndividual) {
                console.error(JSON.stringify(existingIndividual));
                throw new Error('You are attempting to create a duplicate Individual');
            }
            const individual = Individual.build({
                firstName,
                middleName,
                lastName,
                contactInfo,
                description,
                values,
                status
            });
            individual.save();
            addedIndividuals.push(individual);
        }
        


        res.status(201).send(addedIndividuals);
    
    }
);

export { router as createIndividualRouter };