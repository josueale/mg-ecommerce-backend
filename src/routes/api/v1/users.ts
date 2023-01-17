import { Router } from 'express';

import AuthMiddleware from '@Middlewares/Auth.middleware';

import { createUserController, deleteUserController, loginByTokenController, loginUserController, updateUserProfileController } from '@Controllers/users/v1';


const router = Router();

router.post('/register', createUserController)
router.post('/login', loginUserController)
router.get('/token', loginByTokenController)

router.delete('/user/:id', deleteUserController)

router.put('/profile', AuthMiddleware, updateUserProfileController)

export default router;
