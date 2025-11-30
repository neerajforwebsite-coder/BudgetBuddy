const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile
} = require("../controllers/usersCtrl");
const isAuth = require("../middlewares/isAuth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuth, getUserProfile);

module.exports = router;
