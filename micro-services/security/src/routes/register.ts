import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { User } from '../models/User-mongoose';
import { baseUrl } from '../config/end-points';
import crypto from 'crypto';

declare const validateRequest: (req: Request, res: Response, next: NextFunction) => void;

const router = express.Router();

const isValidUser = async (userName: string, password: string, email: string, res: Response, next: Function) => {
    const user = await User.findOne({ name: userName });

    // if we have a user invoke the call back function with the User and return true
    if (user) {
        await next(user, password, true, res, email);
        return true;
    } 
        
    // if we don't have a user return false\
    await next(userName, password, false, res, email);
    return false;
};

const registerUser = async (userName: string, password: string, exists: boolean, res: Response, email: string) => {
    if (exists) {
        return null;
        res.status(409).send("Unable to register the user");
    } else {
        const shaPass = crypto.createHash("sha256").update(password).digest("hex");
        const attrs = {
            name: userName,
            password: shaPass,
            email,
            status: 'Active'
        };
        const user = User.build(attrs);
        await user.save();
        res.status(201).send(user);
    }

}

router.post(
    `${baseUrl}/oauth2/register`,
    [
        body('userName')
            .trim()
            .exists()
                .withMessage("User Id is required")
            .isLength({ min: 5, max: 1000 })
                .withMessage('The User Id must be between 5 and 1000 characters'),
        body('password')
            .trim()
            .exists()
                .withMessage("Password is required")
            .isLength({ min: 5, max: 1000 })
                .withMessage('The password must be between 5 and 1000 characters'),
    ],
    // validateRequest,
    async (req: Request, res: Response) => {
        const { userName, password, email } = req.body;
        await isValidUser(userName, password, email, res, registerUser);
    }
);


export { router as createRouter };