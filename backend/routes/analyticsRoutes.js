const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analyticsController");
const { protect, authorize } = require("../middleware/auth");

// All analytics routes require authentication and at least manager role
router.use(protect);
router.use(authorize("admin", "manager"));

router.get("/dashboard", analyticsController.getDashboardAnalytics);
router.get("/productivity", analyticsController.getProductivityTrends);
router.get(
  "/workers/:workerId/performance",
  analyticsController.getWorkerPerformance,
);
router.get("/team/stats", analyticsController.getTeamStatistics);
router.get(
  "/tasks/completion-rates",
  analyticsController.getTaskCompletionRates,
);
router.get("/time-tracking", analyticsController.getTimeTrackingData);

module.exports = router;
