import { Types } from 'mongoose';

export type DailyWorkoutPlan = {
	day: number;
	exercises: Exercise[];
	details?: string;
};

export type Exercise = {
	name: string;
	duration?: string;
	sets?: number;
	reps?: number;
	details?: string;
};

export type DailyNutritionPlan = {
	day: number;
	breakfast: string;
	lunch: string;
	dinner: string;
	snacks: string;
	details: string;
};

// export type Meal = {
// 	name: string;
// 	ingredients: Ingredient[];
// 	calories: number;
// 	macros?: MacroNutrients;
// 	recipeLink?: string;
// 	details?: string;
// };

// export type MacroNutrients = {
// 	proteins: number;
// 	carbohydrates: number;
// 	fats: number;
// 	alcohols: number;
// };

// export type Ingredient = {
// 	grams: number;
// 	name: string;
// };

export interface IUser {
	// id: number;
	username: string;
	password: string;
	role: 'admin' | 'member' | 'developer';
	age: number;
	gender: 'M' | 'F' | 'O';
	height: number;
	level: 'beginner' | 'intermediate' | 'advanced';
	plan: Types.ObjectId;
}

export interface IPlan {
	// id: number;
	slug: string;
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
	plan: DailyNutritionPlan[];
}

export interface IWorkoutPlan {
	// id: number;
	slug: string;
	title: string;
	subtitle: string;
	from: Date;
	to: Date;
	trainer: string;
	plan: DailyWorkoutPlan[];
}
