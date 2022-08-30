import mongoose, { Schema, Types } from 'mongoose';

import { IPlan } from '../model';

const Plan = mongoose.model<IPlan>('Plan');

export const GET_DEFAULT_PLAN = () => {
	return Plan.findOne().then((res) => {
		console.log(res);
		return res.id;
	});
};
