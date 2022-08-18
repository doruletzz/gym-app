import express from 'express';
import { PlanController } from './plans';

import { UserController } from './users';

const router = express.Router();

router.use('/user', UserController);

router.use('/plan', PlanController);

export const Controller = router;
