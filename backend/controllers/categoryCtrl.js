const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const categoryController = {
  //! CREATE CATEGORY
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;

    if (!name || !type) {
      throw new Error("Name and type are required.");
    }

    const normalizedName = name.toLowerCase();

    const validTypes = ["income", "expense"];
    if (!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type.");
    }

    // Check duplicate
    const exists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });

    if (exists) {
      throw new Error(`Category '${exists.name}' already exists.`);
    }

    const category = await Category.create({
      name: normalizedName,
      type,
      user: req.user,
    });

    // ✔ Return clean object (React expects object)
    res.status(201).json(category);
  }),

  //! LIST ALL CATEGORIES
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });

    // ✔ Return pure array (React expects array)
    res.status(200).json(categories);
  }),

  //! UPDATE CATEGORY
  update: asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, type } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Authorization
    if (category.user.toString() !== req.user.toString()) {
      return res.status(403).json({ message: "Not authorized." });
    }

    const oldName = category.name;

    if (name) category.name = name.toLowerCase();
    if (type) category.type = type;

    const updated = await category.save();

    // Update transactions if needed
    if (oldName !== updated.name) {
      await Transaction.updateMany(
        { user: req.user, category: category._id },
        { $set: { category: category._id } }
      );
    }

    // ✔ Return object only
    res.status(200).json(updated);
  }),

  //! DELETE CATEGORY
  delete: asyncHandler(async (req, res) => {
    const categoryId = req.params.id;

    // 1. Find category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // 2. Authorization
    if (category.user.toString() !== req.user.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this category",
      });
    }

    // 3. Check usage in transactions
    const used = await Transaction.find({
      user: req.user,
      category: categoryId,
    });

    if (used.length > 0) {
      return res.status(400).json({
        message:
          "Cannot delete this category because it is used in transactions.",
      });
    }

    // 4. Delete safely
    const deleted = await Category.findByIdAndDelete(categoryId);

    // ✔ Return object only
    res.status(200).json(deleted);
  }),
};

module.exports = categoryController;
