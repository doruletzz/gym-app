import express, { NextFunction, Request, Response } from 'express';
import { INutritionPlan, IPlan, IUser, IWorkoutPlan } from '../../model';
import { auth } from '../auth';

import jsonwebtoken from 'jsonwebtoken';
import { JwtPayload } from './type';
import mongoose, { Schema } from 'mongoose';

const NutritionPlan = mongoose.model<INutritionPlan>('NutritionPlan');
const WorkoutPlan = mongoose.model<IWorkoutPlan>('WorkoutPlan');

const Plan = mongoose.model<IPlan>('Plan');

const router = express.Router();

router.post(
	'/nutrition',
	auth.admin,
	async (req: Request<{}, {}, INutritionPlan, {}>, res: Response, next) => {
		console.log(req.body);

		if (!req.body.slug) return res.status(400).json('Slug not found');

		return NutritionPlan.create(req.body)
			.then((np) => {
				console.log(np);

				res.json(np);
			})
			.catch(next);
	}
);

router.post('/', auth.admin, async (req, res, next) => {
	console.log(req.body);

	if (!req.body.slug) return res.status(400).json('Slug not found');

	return Plan.create(req.body)
		.then((wp) => {
			console.log(wp);

			res.json(wp);
		})
		.catch(next);
});

router.post('/workout', auth.admin, async (req, res, next) => {
	console.log(req.body);

	if (!req.body.slug) return res.status(400).json('Slug not found');

	return WorkoutPlan.create(req.body)
		.then((wp) => {
			console.log(wp);

			res.json(wp);
		})
		.catch(next);
});

// TODO: MANAGE PLAN ASSIGNMENT FOR THE USER ON LOGIN AND GET PLAN ID FROM TOKEN
router.get('/', auth.required, async (req, res, next) => {
	const HARDCODED_SLUG = 'beginner-male-plan';

	(await Plan.findOne({ slug: HARDCODED_SLUG }))
		.populate(['nutritionPlan', 'workoutPlan'])
		.then((plan) => {
			console.log(plan);

			if (!plan)
				return res.json(404).json({ message: 'Plan was not found!' });

			return res.json(plan);
		});
});

router.get(
	'/:slug',
	auth.required,
	async (req: Request<{}, {}, {}, {}>, res: Response, next) => {
		console.log(req.body);

		Plan.findById(req.body).then((plan) => {
			console.log(plan);

			if (!plan) return res.json('Plan not found');

			return res.json(plan);
		});
	}
);

router.get(
	'/nutrition/:slug',
	auth.required,
	async (
		req: Request<{ slug: string }, {}, {}, {}>,
		res: Response,
		next: NextFunction
	) => {
		const plan = NutritionPlan.findOne({ slug: req.params.slug })
			.then((np) => {
				if (!np)
					return res
						.status(404)
						.json({ message: 'Nutrition Plan not found' });

				console.log(np);
				return res.json(np);
			})
			.catch(next);
	}
);

router.get(
	'/workout/:slug',
	auth.required,
	async (req: Request<{ slug: string }, {}, {}, {}>, res: Response, next) => {
		WorkoutPlan.findOne({ slug: req.params.slug })
			.then((wp) => {
				if (!wp)
					return res
						.status(404)
						.json({ message: 'Workout Plan not found' });

				console.log(wp);
				return res.json(wp);
			})
			.catch(next);
	}
);

export const PlanController = router;
