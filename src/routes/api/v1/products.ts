import { Router } from 'express';

import {
  createProductController,
  deleteProductController,
  getProductByIdController,
  getProductsController,
  updateProductController
} from '@Controllers/products/v1';

// TODO add auth middleware to create update and delete product

const router = Router();

router.get('/', getProductsController);

router.post('/', createProductController);

router.put('/', updateProductController);

router.get('/:id', getProductByIdController);

router.delete('/:id', deleteProductController);

export default router;
