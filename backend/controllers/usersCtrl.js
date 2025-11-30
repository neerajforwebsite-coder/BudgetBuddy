const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const usersController = {
  //! Register
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
    });
  }),

  //! Login
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid login credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid login credentials");

    // ✅ FIXED: Use JWT_SECRET from .env
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({
      message: "Login Success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  //! Profile
  profile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) throw new Error("User not found");
    res.json({ username: user.username, email: user.email });
  }),

  //! Change password
  changeUserPassword: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user);
    if (!user) throw new Error("User not found");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);

    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });

    res.json({ message: "Password Changed successfully" });
  }),

  //! Update profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { username: req.body.username, email: req.body.email },
      { new: true }
    );

    res.json({ message: "User profile updated successfully", updatedUser });
  }),
};

module.exports = usersController;
