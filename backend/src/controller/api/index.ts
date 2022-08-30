import express from 'express';
import { PlanController } from './plans';

import { UserController } from './users';

const router = express.Router();

router.use('/users', UserController);

router.use('/plans', PlanController);

export const Controller = router;
