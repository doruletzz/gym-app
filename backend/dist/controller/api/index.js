"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = __importDefault(require("express"));
const plans_1 = require("./plans");
const users_1 = require("./users");
const router = express_1.default.Router();
router.use('/user', users_1.UserController);
router.use('/plan', plans_1.PlanController);
exports.Controller = router;
