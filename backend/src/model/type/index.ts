import { Types } from 'mongoose';

export interface IUser {
	// id: number;
	username: string;
	password: string;
	age: number;
	gender: 'M' | 'F' | 'O';
	height: number;
	level: 'beginner' | 'intermediate' | 'advanced';
	plan: Types.ObjectId;
}

export interface IPlan {
	// id: number;
	nutritionPlan: INutritionPlan;
	workoutPlan: IWorkoutPlan;
}

export interface INutritionPlan {
	// id: number;
	slug: string;
	title: string;
	subtitle: string;
	from: Date;
	to: Date;
	nutritionist: string;
	plan: string[];
}

export interface IWorkoutPlan {
	// id: number;
	slug: string;
	title: string;
	subtitle: string;
	from: Date;
	to: Date;
	trainer: string;
	plan: string[];
}
