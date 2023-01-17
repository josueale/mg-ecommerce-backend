import { Router } from 'express';

import {
  getCartController,
  updateCartController,
} from '@Controllers/cart/v1';

const router = Router();


router.get('/', getCartController);
router.put('/', updateCartController);

export default router;
