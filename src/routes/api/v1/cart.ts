import { Router } from 'express';

import {
  CheckoutController,
  getCartController,
  updateCartController
} from '@Controllers/cart/v1';

const router = Router();


router.get('/', getCartController);
router.put('/', updateCartController);

router.post('/checkout', CheckoutController);



export default router;
