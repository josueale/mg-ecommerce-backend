import { Router } from 'express';

import {
  CheckoutController,
  deleteItemController,
  getCartController,
  updateCartController,
} from '@Controllers/cart/v1';

const router = Router();


router.get('/', getCartController);
router.put('/', updateCartController);

router.delete('/item/:productId', deleteItemController);

router.post('/checkout', CheckoutController);



export default router;
