import express from 'express';
import { authUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/user',authUser);

export default router;
