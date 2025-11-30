const express = require("express");
const isAuthenticated = require("../middlewares/isAuth");
const categoryController = require("../controllers/categoryCtrl");

const categoryRouter = express.Router();

// Create category
categoryRouter.post("/create", isAuthenticated, categoryController.create);

// List categories
categoryRouter.get("/lists", isAuthenticated, categoryController.lists);

// Update category
categoryRouter.put("/update/:categoryId", isAuthenticated, categoryController.update);

// Delete category
categoryRouter.delete("/delete/:id", isAuthenticated, categoryController.delete);

module.exports = categoryRouter;
