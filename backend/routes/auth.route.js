import express from 'express';
import { register, signin } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/register', register);
router.post('/signin', signin);

export default router;