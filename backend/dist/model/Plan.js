"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// TODO: add slugify
const NutritionPlanSchema = new mongoose_1.default.Schema({
    slug: { type: String, lowercase: true, unique: true },
});
// TODO: add slugify
const WorkoutPlanSchema = new mongoose_1.default.Schema({
    slug: { type: String, lowercase: true, unique: true },
});
const PlanSchema = new mongoose_1.default.Schema({
    nutritionPlan: NutritionPlanSchema,
    workoutPlan: WorkoutPlanSchema,
});
mongoose_1.default.model('Plan', PlanSchema);
mongoose_1.default.model('NutritionPlan', NutritionPlanSchema);
mongoose_1.default.model('WorkoutPlan', WorkoutPlanSchema);
