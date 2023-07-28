import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { baseUrl } from '../config/end-points';
import { genai_k } from '../config/cgpt_ek';

const router = express.Router();

router.post(
    `${baseUrl}query`,
    [
        body('prompt').notEmpty()
            .withMessage('All gen ai calls require a prompt')
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { prompt } = req.body;
        
        console.log(`make a gen ai post call with prompt ${prompt}`);
        const placeholder = {
            response: 'implementation penmding',
            key: genai_k
        };
        res.status(201).send(placeholder);
    
    }
);


export { router as queryRouter };