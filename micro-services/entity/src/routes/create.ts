import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Entity, EntityDoc } from '../models/Entity-mongoose';
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
    `${baseUrl}nested/create`,
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

        // find all properties starting with gc_ or gcl_ (nested properties)
        const entity = createEntity(type, description, values, status);
        res.status(201).send(entity);
    }
);

const findNestedProperties = (values: JSON, prefix: string) => {
    const nestedProps = [];
    for (let property in values) {
        if (
            values.hasOwnProperty(property)
            && property.toString().startsWith(prefix)
        ) {
            nestedProps.push(property)
        }
    }
    return nestedProps;
}

const createEntity = (type: string, description: string, values: JSON, status: string) => {
    // find all properties starting with gc_ or gcl_ (nested properties)
    let objValues = Object.assign(new Object(), values);
    const nestedProps = findNestedProperties(values, 'gc_');
    console.log(JSON.stringify(objValues));
    // create the nested prop and replace existing ref with the new key
    nestedProps.map(nestedProp => {
        const newName = nestedProp.substring(3);
        console.log(newName);
        // @ts-ignore
        const nestedValues = objValues[nestedProp];
        const nestedEntity = createEntity(newName, `Nest ${newName}`, nestedValues, status);
        console.log(nestedEntity);
        //     delete objValues[nestedProp];
        // @ts-ignore
        objValues[nestedProp] = nestedEntity._id;
        values = objValues as JSON;
        console.log(values);
    })
    const entity = Entity.build({
        type,
        description,
        values,
        status
    });
    entity.save();
    return entity;
}

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

            // find all properties starting with gc_ or gcl_ (nested properties)
            const entity = createEntity(type, description, values, status);
            addedEntities.push(entity);
        }

        res.status(201).send(addedEntities);
    
    }
);

export { router as createRouter };