import { Router } from 'express';

import AuthMiddleware from '@Middlewares/Auth.middleware';

import {
  createUserController,
  deleteUserController,
  getUserByIdForAdminController,
  getUsersForAdminController,
  loginByTokenController,
  loginUserController,
  updateUserProfileController
} from '@Controllers/users/v1';


const router = Router();

router.get('/admin', getUsersForAdminController )
router.get('/admin/:id', getUserByIdForAdminController )


router.post('/register', createUserController)
router.post('/login', loginUserController)
router.post('/login/token', loginByTokenController)

router.delete('/user/:id', deleteUserController)

router.put('/profile', AuthMiddleware, updateUserProfileController)

export default router;

