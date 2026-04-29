const mongoose = require("mongoose");
const Expense = require("../models/Expense");

const categories = ["Food", "Transport", "Entertainment", "Others"];

const addExpense = async (req, res, next) => {
  try {
    const { amount, category, description, date } = req.body;

    if (amount === undefined || !category) {
      res.status(400);
      throw new Error("Amount and category are required.");
    }

    if (!categories.includes(category)) {
      res.status(400);
      throw new Error("Invalid category.");
    }

    const expense = await Expense.create({
      userId: req.user.id,
      amount: Number(amount),
      category,
      description: description || "",
      date: date ? new Date(date) : new Date(),
    });

    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid expense ID.");
    }

    const expense = await Expense.findById(id);
    if (!expense) {
      res.status(404);
      throw new Error("Expense not found.");
    }

    if (expense.userId.toString() !== req.user.id) {
      res.status(403);
      throw new Error("Forbidden: cannot delete this expense.");
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { addExpense, getExpenses, deleteExpense };
