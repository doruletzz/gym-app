import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { IUser } from '../../model';

import jsonwebtoken from 'jsonwebtoken';
import { auth } from '../auth';
import { SECRET } from '../../config';

const router = express.Router();

const User = mongoose.model<IUser>('User');

const TOKEN = '1';

router.post(
	'/login',
	async (
		req: Request<{}, {}, { username: string; password: string }, {}>,
		res: Response,
		next
	) => {
		// console.log(req);

		User.findOne({
			username: req.body.username,
			password: req.body.password,
		})
			.then((user) => {
				// TODO: generate Token, throw error if token generation failed

				if (!user) {
					return res.status(422).json({ error: 'Wrong Credentials' });
				}

				// return res.json({ token: 'aa' });

				console.log(user);
				const token = jsonwebtoken.sign(
					{ user: user.username },
					SECRET
				);

				return res.cookie('token', token, { httpOnly: true }).json({
					token,
				});
			})
			.catch((err) => res.status(422).json(err));
	}
);

router.put(
	'/',
	async (req: Request<{}, {}, IUser, {}>, res: Response, next) => {
		res.status(500).json({ message: 'NOT IMPLMENETED' });
	}
);

router.post(
	'/register',
	async (
		req: Request<{}, {}, IUser, {}>,
		res: Response,
		next: NextFunction
	) => {
		console.log(req.body);
		let user = new User();

		user.username = req.body.username;
		user.password = req.body.password;

		user.age = req.body.age;
		user.gender = req.body.gender;
		user.height = req.body.height;
		user.level = req.body.level;

		user.save()
			.then(() => {
				// TODO: generate Token, throw error if token generation failed
				console.log(user);
				return res.json({ token: TOKEN });
			})
			.catch(next);
	}
);

export const UserController = router;
