const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const transactionController = {
  //! CREATE TRANSACTION
  create: asyncHandler(async (req, res) => {
    const { type, category, amount, date, description } = req.body;

    // Validate required fields
    if (!amount || !type || !date) {
      throw new Error("Type, amount and date are required");
    }

    // Logged-in user ID from middleware
    const userId = req.user;

    // 🎯 FIX: Convert Category NAME 👉 ObjectId
    let categoryId = null;

    if (category) {
      const foundCategory = await Category.findOne({ name: category });

      if (!foundCategory) {
        throw new Error("Category not found");
      }

      categoryId = foundCategory._id;
    }

    // Create transaction
    const transaction = await Transaction.create({
      user: userId,
      type: type.toLowerCase(),
      category: categoryId,
      amount,
      date,
      description,
    });

    res.status(201).json(transaction);
  }),

  //! GET LIST WITH FILTERS
  getFilteredTransactions: asyncHandler(async (req, res) => {
    const { startDate, endDate, type, category } = req.query;

    let filters = { user: req.user };

    // Filter by date
    if (startDate) {
      filters.date = { ...filters.date, $gte: new Date(startDate) };
    }
    if (endDate) {
      filters.date = { ...filters.date, $lte: new Date(endDate) };
    }

    // Filter by type
    if (type && type !== "All") {
      filters.type = type.toLowerCase();
    }

    // Filter by Category (name → ID)
    if (category && category !== "All") {
      const foundCategory = await Category.findOne({ name: category });
      if (foundCategory) {
        filters.category = foundCategory._id;
      } else {
        return res.json([]);
      }
    }

    const transactions = await Transaction.find(filters).sort({ date: -1 });
    res.json(transactions);
  }),

  //! UPDATE TRANSACTION
  update: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (transaction && transaction.user.toString() === req.user.toString()) {
      transaction.type = req.body.type?.toLowerCase() || transaction.type;

      // Convert category if updated (name → ID)
      if (req.body.category) {
        const foundCategory = await Category.findOne({
          name: req.body.category,
        });
        if (foundCategory) {
          transaction.category = foundCategory._id;
        }
      }

      transaction.amount = req.body.amount || transaction.amount;
      transaction.date = req.body.date || transaction.date;
      transaction.description =
        req.body.description || transaction.description;

      const updatedTransaction = await transaction.save();
      res.json(updatedTransaction);
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  }),

  //! DELETE TRANSACTION
  delete: asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    if (transaction.user.toString() !== req.user.toString()) {
      res.status(401);
      throw new Error("Not authorized");
    }

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({ message: "Transaction removed" });
  }),
};

module.exports = transactionController;
