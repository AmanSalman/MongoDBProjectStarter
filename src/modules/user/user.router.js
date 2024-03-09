import express, { Router } from 'express';
import * as userController from './user.controller.js';
import auth from '../../middleware/auth.js';

const router = Router();

router.get('/', userController.getUsers);
router.delete('/destroy',auth, userController.destroy);
router.patch('/update',auth, userController.update);

export default router;