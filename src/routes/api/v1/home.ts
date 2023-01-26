import { Router } from 'express';

import {
  getHomeController
} from '@Controllers/home/v1';

const router = Router();


router.get('/', getHomeController);



export default router;
