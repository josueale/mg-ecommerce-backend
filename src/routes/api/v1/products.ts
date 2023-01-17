import { Router } from 'express';

import {
  createProductController,
  deleteProductController,
  getProductsController,
  updateProductController,
} from '@Controllers/products/v1';


const router = Router();

router.get('/', getProductsController);

router.post('/', createProductController);

router.put('/', updateProductController);

router.delete('/:id', deleteProductController);

export default router;
