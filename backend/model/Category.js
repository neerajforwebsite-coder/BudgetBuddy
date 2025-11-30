const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Category name should ALWAYS come from user input, NOT from a default
    name: {
      type: String,
      required: true,
      trim: true,       // removes extra spaces
      lowercase: true, // keeps names consistent
    },

    type: {
      type: String,
      required: true,
      enum: ["income", "expense"], // allowed types only
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
