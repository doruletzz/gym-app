import mongoose from 'mongoose';
import { INutritionPlan, IPlan, IWorkoutPlan } from './type';

// TODO: add slugify
const NutritionPlanSchema = new mongoose.Schema<INutritionPlan>({
	slug: { type: String, lowercase: true, unique: true },
});

// TODO: add slugify
const WorkoutPlanSchema = new mongoose.Schema<IWorkoutPlan>({
	slug: { type: String, lowercase: true, unique: true },
});

const PlanSchema = new mongoose.Schema<IPlan>({
	nutritionPlan: NutritionPlanSchema,
	workoutPlan: WorkoutPlanSchema,
});

mongoose.model('Plan', PlanSchema);
mongoose.model('NutritionPlan', NutritionPlanSchema);
mongoose.model('WorkoutPlan', WorkoutPlanSchema);
