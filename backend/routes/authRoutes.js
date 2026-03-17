const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect, authorize } = require("../middleware/auth");

const baseRegistrationValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("department").optional().trim(),
  body("phone").optional().trim(),
];

// Public routes
router.post(
  "/register",
  [
    ...baseRegistrationValidation,
    body("role")
      .optional()
      .isIn(["worker", "supplier"])
      .withMessage(
        "Public registration is available for worker or supplier accounts only",
      ),
  ],
  authController.register,
);

router.post(
  "/users",
  protect,
  authorize("admin"),
  [
    ...baseRegistrationValidation,
    body("role")
      .optional()
      .isIn(["admin", "manager", "worker", "supplier"])
      .withMessage("Please select a valid role"),
  ],
  authController.createUser,
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .normalizeEmail()
      .isEmail()
      .withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  authController.login,
);

// Protected routes
router.get("/me", protect, authController.getMe);
router.put("/profile", protect, authController.updateProfile);
router.put("/change-password", protect, authController.changePassword);

module.exports = router;
