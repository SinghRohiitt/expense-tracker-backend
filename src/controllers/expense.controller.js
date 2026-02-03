import mongoose from "mongoose";
import Expense from "../models/Expense.js";
import User from "../models/User.js";

// Add a new expense for a user
export const addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, date } = req.body;

    // Basic input validation to avoid unnecessary DB calls
    if (!userId || !title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const expense = await Expense.create({
      user: userId,
      title,
      amount,
      category,
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Expense added successfully",
      data: expense,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Unable to add expense. Please check input data.",
    });
  }
};

// Get all expenses for a specific user
export const getUserExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const expenses = await Expense.find({ user: id })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      message: "User expenses fetched successfully",
      count: expenses.length,
      data: expenses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user expenses",
    });
  }
};

// Get monthly expense summary for a user
export const getUserMonthlySummary = async (req, res) => {
  try {
    const { id: userId } = req.params;

    // User existence check before running aggregation
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const currentDate = new Date();
    const monthStart = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    const monthlyStats = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: monthStart, $lt: monthEnd },
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$amount" },
          expenseCount: { $sum: 1 },
        },
      },
    ]);

    const totalSpent = monthlyStats[0]?.totalSpent || 0;
    const expenseCount = monthlyStats[0]?.expenseCount || 0;
    const remainingBudget = user.monthlyBudget - totalSpent;

    return res.status(200).json({
      success: true,
      message: "Monthly expense summary fetched successfully",
      data: {
        totalExpenses: totalSpent,
        remainingBudget,
        expenseCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to generate monthly expense summary",
    });
  }
};
