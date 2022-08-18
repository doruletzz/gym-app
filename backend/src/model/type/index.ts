export interface IUser {
	// id: number;
	username: string;
	password: string;
	age: number;
	gender: 'M' | 'F' | 'O';
	height: number;
	level: 'beginner' | 'intermediate' | 'advanced';
}

export interface IPlan {
	// id: number;
	nutritionPlan: INutritionPlan;
	workoutPlan: IWorkoutPlan;
}

export interface INutritionPlan {
	// id: number;
	slug: string;
}

export interface IWorkoutPlan {
	// id: number;
	slug: string;
}
