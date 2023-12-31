import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { IUser } from '../../model';

import jsonwebtoken from 'jsonwebtoken';
import { auth } from '../auth';
import { SECRET } from '../../config';
import { JwtPayload } from './type';
import { GET_DEFAULT_PLAN } from '../../utils';

const router = express.Router();

const User = mongoose.model<IUser>('User');

const TOKEN = '1';

router.get('/', auth.required, async (req: Request, res: Response, next) => {
	jsonwebtoken.verify(
		req.cookies.token,
		SECRET,
		{
			algorithms: ['HS256'],
		},
		(err, user: JwtPayload) => {
			// console.log(err);

			if (err) return res.status(403).json({ message: err });

			const username = user.user;

			return User.findOne({ username })
				.then(async (userdata: IUser) => {
					if (!userdata)
						return res
							.status(404)
							.json({ message: 'User was not found' });

					if (!userdata.plan) {
						const plan = await GET_DEFAULT_PLAN();
						userdata.plan = plan;
						return res.json(userdata);
					}

					return res.json(userdata);
				})
				.catch(next);
		}
	);
});

router.put(
	'/',
	auth.required,
	async (req: Request<{}, {}, IUser, {}>, res, next) => {
		const newUser = JSON.parse(JSON.stringify(req.body));

		if (!newUser.username)
			return res.status(500).json({ message: 'No username' });

		newUser.plan = await GET_DEFAULT_PLAN();

		jsonwebtoken.verify(
			req.cookies.token,
			SECRET,
			{
				algorithms: ['HS256'],
			},
			(err, user: JwtPayload) => {
				if (err) return res.status(403).json({ message: err });

				const username = user.user;
				const role = user.role;

				return User.updateOne(
					{ username },
					newUser,
					{ new: true },
					(err, userdata) => {
						if (err) return next(err);

						if (!userdata)
							return res
								.status(404)
								.json({ message: 'User was not found' });
						// console.log(userdata);

						if (username === newUser.username)
							return res.json({ token: req.cookies.token });

						// Change cookie if username is changed
						const newToken = jsonwebtoken.sign(
							{
								user: newUser.username,
								role: user.role ?? 'member',
							} as JwtPayload,
							SECRET
						);

						// console.log(newToken);

						return res
							.cookie('token', newToken, {
								httpOnly: true,
							})
							.json({ token: newToken });
					}
				);
			}
		);
	}
);

router.post(
	'/login',
	async (
		req: Request<{}, {}, { username: string; password: string }, {}>,
		res: Response,
		next: NextFunction
	) => {
		// // console.log(req);

		User.findOne({
			username: req.body.username,
			password: req.body.password,
		})
			.then((user) => {
				// TODO: generate Token, throw error if token generation failed

				if (!user) {
					return res
						.status(422)
						.json({ message: 'Wrong Credentials' });
				}

				// return res.json({ token: 'aa' });

				// console.log(user, user.role);
				const token = jsonwebtoken.sign(
					{
						user: user.username,
						role: user.role ?? 'member',
					} as JwtPayload,
					SECRET
				);

				// console.log(token, user.username);

				return res.cookie('token', token, { httpOnly: true }).json({
					token,
				});
			})
			.catch(next);
	}
);

// router.put(
// 	'/',
// 	async (
// 		req: Request<{}, {}, IUser, {}>,
// 		res: Response,
// 		next: NextFunction
// 	) => {
// 		res.status(500).json({ message: 'NOT IMPLMENETED' });
// 	}
// );

router.post(
	'/register',
	async (
		req: Request<{}, {}, IUser, {}>,
		res: Response,
		next: NextFunction
	) => {
		// console.log(req.body);

		const isUsernameUnique =
			User.findOne({ username: req.body.username }) !== null;

		let user = new User();

		user.username = req.body.username;
		user.password = req.body.password;

		user.age = req.body.age;
		user.gender = req.body.gender;
		user.height = req.body.height;
		user.level = req.body.level;
		user.plan = await GET_DEFAULT_PLAN();

		user.save((err, user) => {
			// TODO: generate Token, throw error if token generation failed
			// console.log(user);

			if (err) {
				return res
					.status(422)
					.json({ message: 'Username already taken' });
			}

			if (!user) {
				return res
					.status(422)
					.json({ message: 'User could not be registered' });
			}

			// console.log(user.username);

			const token = jsonwebtoken.sign(
				{
					user: user.username,
					role: user.role ?? 'member',
				} as JwtPayload,
				SECRET
			);

			// console.log(token);

			return res.cookie('token', token, { httpOnly: true }).json({
				token,
			});
		});
	}
);

export const UserController = router;
