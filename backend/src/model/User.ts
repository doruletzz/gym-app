import { timeStamp } from 'console';
import mongoose, { Schema } from 'mongoose';
import { IUser } from './type';

const UserSchema = new mongoose.Schema<IUser>(
	{
		username: String,
		password: String,
		age: Number,
		gender: String,
		height: { type: Number, min: 0 },
		level: String,
	},
	{ timestamps: true }
);

// UserSchema.query.byUsernamePassword = (username: string, password : string) => {
//     return this.where({username: })
// }

mongoose.model<IUser>('User', UserSchema);
