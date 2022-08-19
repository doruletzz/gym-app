import express, { Request, Response } from 'express';
import { IPlan, IUser } from '../../model';
import { auth } from '../auth';

import jsonwebtoken from 'jsonwebtoken';
import { JwtPayload } from './type';
import mongoose, { Schema } from 'mongoose';

const Plan = mongoose.model<IPlan>('Plan');

const router = express.Router();

router.get(
	'/',
	auth.required,
	async (
		req: Request<{}, {}, Schema.Types.ObjectId, {}>,
		res: Response,
		next
	) => {
		console.log(req.body);

		Plan.findById(req.body).then((plan) => {
			console.log(plan);

			if (!plan) return res.status(422).json('Plan not found');

			return res.json(plan);
		});
	}
);

router.get(
	'/nutrition/:slug',
	auth.required,
	async (req: Request<{}, {}, {}, {}>, res: Response, next) => {
		console.log('PLAN');
		res.json('WORKOUT PLAN');
	}
);

router.get(
	'/workout/:slug',
	auth.required,
	async (req: Request<{}, {}, {}, {}>, res: Response, next) => {
		const token = jsonwebtoken.decode(req.cookies.token.token);

		console.log(token, 'PLAN');
		res.json('WORKOUT PLAN');
	}
);

export const PlanController = router;
