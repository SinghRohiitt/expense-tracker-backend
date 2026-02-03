import mongoose from "mongoose";
import User from "./User.js";

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: [1, "Expense amount must be greater than 0"],
    },

    category: {
      type: String,
      required: true,
      enum: ["Food", "Travel", "Shopping", "Bills", "Other"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Middleware to ensure the user exists before saving an expense
expenseSchema.pre("save", async function () {
  const userExists = await User.findById(this.user);

  if (!userExists) {
    throw new Error("Cannot add expense for non-existing user");
  }
});
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
