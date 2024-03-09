import express, { Router } from 'express';
import * as userController from './user.controller.js';

const router = Router();

router.get('/', userController.getUsers);
router.delete('/destroy/:_id', userController.destroy);
router.put('/update/:_id', userController.update);

export default router;