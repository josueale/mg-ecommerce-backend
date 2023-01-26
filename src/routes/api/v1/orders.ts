import { Router } from 'express';


import {
  GetOrderByIdController,
  GetOrdersController,
} from '@Controllers/orders/v1';


const router = Router();

router.get('/', GetOrdersController)

router.get('/:id', GetOrderByIdController)


export default router;

