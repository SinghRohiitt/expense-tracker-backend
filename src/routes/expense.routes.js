import express from "express";
import {
  addExpense,
  getUserExpenses,
  getUserMonthlySummary,
} from "../controllers/expense.controller.js";

const router = express.Router();

// Add a new expense for a user
router.post("/expenses", addExpense);

// Get all expenses for a specific user
router.get("/users/:id/expenses", getUserExpenses);

// Get monthly expense summary for a user
router.get("/users/:id/summary", getUserMonthlySummary);

export default router;
