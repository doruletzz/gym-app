import express, { Request, Response } from 'express';
import { IUser } from '../../model';
import { auth } from '../auth';

const router = express.Router();

router.get(
	'/',
	auth.required,
	async (req: Request<{}, {}, IUser, {}>, res: Response, next) => {
		res.json('WORKOUT PLAN');
	}
);

export const PlanController = router;
