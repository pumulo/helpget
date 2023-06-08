import express, { Request, Response } from 'express';
import { User } from '../models/User-mongoose';
import { baseUrl } from '../config/end-points';

const router = express.Router();

export { router as queryRouter };