import { timeStamp } from 'console';
import mongoose, { Schema, SchemaTypes } from 'mongoose';
import { IUser, IPlan } from './type';

const UserSchema = new mongoose.Schema<IUser>(
	{
		username: { type: String, unique: true },
		password: String,
		age: Number,
		gender: String,
		height: { type: Number, min: 0 },
		level: String,
		plan: { type: Schema.Types.ObjectId, ref: 'Plan' },
	},
	{ timestamps: true }
);

// UserSchema.query.byUsernamePassword = (username: string, password : string) => {
//     return this.where({username: })
// }

mongoose.model<IUser>('User', UserSchema);
