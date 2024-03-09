import express, { Router } from 'express';
import * as authController from './auth.controller.js';
const router = Router();

router.post('/register', authController.register);
router.post('/signin', authController.signin);

export default router;