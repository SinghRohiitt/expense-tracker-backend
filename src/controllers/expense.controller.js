import Expense from '../models/Expense.js';

export const addExpense = async (req, res) => {
  try {
    const { userId, title, amount, category, date } = req.body;

    // Basic request validation (professional but minimal)
    if (!userId || !title || !amount || !category) {
      return res.status(400).json({
        success: false,
        message: 'Required fields are missing'
      });
    }

    const expense = await Expense.create({
      user: userId,
      title,
      amount,
      category,
      date
    });

    res.status(201).json({
      success: true,
      data: expense
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const getUserExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const expenses = await Expense.find({ user: id })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



export const getUserMonthlySummary = async (req, res) => {
  try {
    const { id: userId } = req.params;

    // Ensure user exists before doing heavy operations
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Current month date boundaries
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

    // Aggregation keeps calculation at DB level (efficient)
    const monthlyStats = await Expense.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          date: { $gte: monthStart, $lt: monthEnd }
        }
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$amount' },
          expenseCount: { $sum: 1 }
        }
      }
    ]);

    const totalSpent = monthlyStats[0]?.totalSpent || 0;
    const expenseCount = monthlyStats[0]?.expenseCount || 0;

    const remainingBudget = user.monthlyBudget - totalSpent;

    return res.status(200).json({
      success: true,
      data: {
        totalExpenses: totalSpent,
        remainingBudget,
        expenseCount
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};