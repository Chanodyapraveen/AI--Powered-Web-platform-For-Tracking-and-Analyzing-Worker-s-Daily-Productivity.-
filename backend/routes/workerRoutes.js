const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const workerController = require("../controllers/workerController");
const { protect, authorize } = require("../middleware/auth");

// All worker routes require authentication
router.use(protect);

router.get("/", workerController.getAllWorkers);
router.get("/:id", workerController.getWorkerById);
router.get("/:id/stats", workerController.getWorkerStats);
router.get("/:id/tasks", workerController.getWorkerTasks);

// Create/update/delete require admin or manager role
router.post(
  "/",
  authorize("admin", "manager"),
  [
    body("employeeId").trim().notEmpty().withMessage("Employee ID is required"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
  ],
  workerController.createWorker,
);

router.put(
  "/:id",
  authorize("admin", "manager"),
  workerController.updateWorker,
);
router.delete(
  "/:id",
  authorize("admin", "manager"),
  workerController.deleteWorker,
);

module.exports = router;
