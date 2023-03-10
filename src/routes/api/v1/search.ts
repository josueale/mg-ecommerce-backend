import { searchProductController } from '@Controllers/search/v1';
import { Router } from 'express';

const router = Router();

/*

GET  search/products
  queryParams
    name: '',
    min: 0,
    max: 0,
    category: '',
    order: ['price+-', 'dateCreated', 'comments/popularity' ]

*/

router.get('/products', searchProductController );


export default router;
