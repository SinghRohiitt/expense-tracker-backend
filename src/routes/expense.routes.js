import express from 'express';
import {
  addExpense,
  getUserExpenses
} from '../controllers/expense.controller.js';

const router = express.Router();

router.post('/expenses', addExpense);
router.get('/users/:id/expenses', getUserExpenses);

export default router;
