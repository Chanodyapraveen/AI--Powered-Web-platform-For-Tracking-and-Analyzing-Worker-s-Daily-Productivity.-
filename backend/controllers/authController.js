const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const PUBLIC_REGISTRATION_ROLES = ["worker", "supplier"];
const MANAGED_REGISTRATION_ROLES = ["admin", "manager", "worker", "supplier"];

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

const createUserAccount = async ({
  name,
  email,
  password,
  role,
  department,
  phone,
}) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 400;
    throw error;
  }

  return User.create({
    name,
    email: normalizedEmail,
    password,
    role,
    department,
    phone,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password, role, department, phone } = req.body;
    const requestedRole = role || "worker";

    if (!PUBLIC_REGISTRATION_ROLES.includes(requestedRole)) {
      return res.status(403).json({
        message:
          "Only worker and supplier accounts can be created from the public registration page",
      });
    }

    const user = await createUserAccount({
      name,
      email,
      password,
      role: requestedRole,
      department,
      phone,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: user.toJSON(),
      message: "Registration successful",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new user as admin
// @route   POST /api/auth/users
exports.createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name, email, password, role, department, phone } = req.body;
    const requestedRole = role || "worker";

    if (!MANAGED_REGISTRATION_ROLES.includes(requestedRole)) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    const user = await createUserAccount({
      name,
      email,
      password,
      role: requestedRole,
      department,
      phone,
    });

    res.status(201).json({
      user: user.toJSON(),
      message: `${requestedRole} account created successfully`,
    });
  } catch (error) {
    if (error.statusCode) {
      return res.status(error.statusCode).json({ message: error.message });
    }

    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "Account has been deactivated" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: user.toJSON(),
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email, phone, department, avatar } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (department !== undefined) user.department = department;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({
      user: user.toJSON(),
      message: "Profile updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide current and new password" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};