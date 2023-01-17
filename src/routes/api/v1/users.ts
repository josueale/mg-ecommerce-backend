import { Router } from 'express';


const router = Router();

router.post('/admin/register',)
router.post('/admin/login',)
router.get('/admin/token',)
router.get('/admin',)

router.get('/admin/user',)
router.post('/admin/user',)
router.put('/admin/user',)
router.delete('/admin/user',)


router.post('/ecommerce/register',)
router.post('/ecommerce/login',)
router.get('/ecommerce/token',)
router.get('/ecommerce',)

router.put('/ecommerce/profile',)

export default router;
