import mongoose, { Schema } from 'mongoose';
import { DailyNutritionPlan, INutritionPlan, IPlan, IWorkoutPlan } from './type';

// TODO: add slugify
const NutritionPlanSchema = new mongoose.Schema<INutritionPlan>({
	slug: { type: String, lowercase: true, unique: true, required: true},
	title: String,
	subtitle: String,
	from: Date,
	to: Date,
	nutritionist: String,
	plan: Array<DailyNutritionPlan>,
});

// TODO: add slugify
const WorkoutPlanSchema = new mongoose.Schema<IWorkoutPlan>({
	slug: { type: String, lowercase: true, unique: true, required: true},
	title: String,
	subtitle: String,
	from: Date,
	to: Date,
	trainer: String,
	plan: Array<DailyNutritionPlan>,
});

const PlanSchema = new mongoose.Schema<IPlan>({
	slug: { type: String, lowercase: true, unique: true, required: true},
	nutritionPlan: { type: Schema.Types.ObjectId, ref: 'NutritionPlan' },
	workoutPlan: { type: Schema.Types.ObjectId, ref: 'WorkoutPlan' },
});

mongoose.model('Plan', PlanSchema);
mongoose.model('NutritionPlan', NutritionPlanSchema);
mongoose.model('WorkoutPlan', WorkoutPlanSchema);
