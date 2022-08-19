import exp from 'constants';
import { Request } from 'express';
import { expressjwt as jwt } from 'express-jwt';
import { SECRET } from '../config';

const getTokenFromCookie = (req: Request) => {
	console.log({ ...req.cookies });
	return req.cookies.token;
};

export const auth = {
	required: jwt({
		secret: SECRET,
		algorithms: ['HS256'],
		getToken: getTokenFromCookie,
	}),
};
