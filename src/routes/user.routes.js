import express from 'express';
import { createUser, getUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users/:id', getUserById);

export default router;
