import exp from 'constants';
import { NextFunction, Request, Response } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import jsonwebtoken from 'jsonwebtoken';

import { SECRET } from '../config';
import { JwtPayload } from './api/type';

const getTokenFromCookie = (req: Request) => {
	console.log({ ...req.cookies });
	return req.cookies.token;
};

const getAdminTokenFromCookie = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log({ ...req.cookies });

	const token = req.cookies.token;

	if (token)
		jsonwebtoken.verify(
			token,
			SECRET,
			{ algorithms: ['HS256'] },
			(err, user: JwtPayload) => {
				if (err) return res.status(403).json({ message: err });

				if (user.role !== 'admin')
					return res
						.status(401)
						.json({ message: 'Access Denied, Not an Admin' });

				next();
			}
		);
	else return res.status(401).json({ message: 'Invalid Token' });
};

export const auth = {
	required: jwt({
		secret: SECRET,
		algorithms: ['HS256'],
		getToken: getTokenFromCookie,
	}),
	admin: getAdminTokenFromCookie,
};
