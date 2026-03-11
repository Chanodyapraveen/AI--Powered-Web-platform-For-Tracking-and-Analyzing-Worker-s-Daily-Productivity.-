const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { protect, authorize } = require("../middleware/auth");

// All task routes require authentication
router.use(protect);

router.get("/", taskController.getAllTasks);
router.get("/status/:status", taskController.getTasksByStatus);
router.get("/:id", taskController.getTaskById);

// Create/update/delete require admin or manager role
router.post(
  "/",
  authorize("admin", "manager"),
  [body("title").trim().notEmpty().withMessage("Task title is required")],
  taskController.createTask,
);

router.put("/:id", authorize("admin", "manager"), taskController.updateTask);
router.delete("/:id", authorize("admin", "manager"), taskController.deleteTask);

// Status and assignment updates
router.patch("/:id/status", taskController.updateTaskStatus);
router.patch(
  "/:id/assign",
  authorize("admin", "manager"),
  taskController.assignTask,
);

module.exports = router;
