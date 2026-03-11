const Task = require("../models/Task");
const Worker = require("../models/Worker");

// @desc    Get dashboard analytics
// @route   GET /api/analytics/dashboard
exports.getDashboardAnalytics = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [
      totalWorkers,
      activeWorkers,
      totalTasks,
      tasksByStatus,
      completedToday,
    ] = await Promise.all([
      Worker.countDocuments(),
      Worker.countDocuments({ status: "active" }),
      Task.countDocuments(),
      Task.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Task.countDocuments({
        status: "completed",
        completedAt: { $gte: today, $lt: tomorrow },
      }),
    ]);

    const statusMap = {};
    tasksByStatus.forEach((item) => {
      statusMap[item._id] = item.count;
    });

    const activeTasks = (statusMap.pending || 0) + (statusMap.in_progress || 0);
    const completedTasks = statusMap.completed || 0;
    const productivity =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      totalWorkers,
      activeWorkers,
      totalTasks,
      activeTasks,
      completedTasks,
      completedToday,
      productivity,
      tasksByStatus: statusMap,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get productivity trends
// @route   GET /api/analytics/productivity
exports.getProductivityTrends = async (req, res, next) => {
  try {
    const { period = "7d" } = req.query;

    let days;
    switch (period) {
      case "30d":
        days = 30;
        break;
      case "90d":
        days = 90;
        break;
      default:
        days = 7;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const trends = await Task.aggregate([
      {
        $match: {
          completedAt: { $gte: startDate },
          status: "completed",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$completedAt" },
          },
          completed: { $sum: 1 },
          totalHours: { $sum: { $ifNull: ["$actualHours", 0] } },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Fill in missing days with zero counts
    const filledTrends = [];
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split("T")[0];
      const existing = trends.find((t) => t._id === dateStr);
      filledTrends.push({
        date: dateStr,
        completed: existing ? existing.completed : 0,
        totalHours: existing ? existing.totalHours : 0,
      });
    }

    res.json({ trends: filledTrends, period });
  } catch (error) {
    next(error);
  }
};

// @desc    Get worker performance
// @route   GET /api/analytics/workers/:workerId/performance
exports.getWorkerPerformance = async (req, res, next) => {
  try {
    const { workerId } = req.params;
    const { period = "30d" } = req.query;

    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    let days;
    switch (period) {
      case "7d":
        days = 7;
        break;
      case "90d":
        days = 90;
        break;
      default:
        days = 30;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [taskStats, dailyPerformance] = await Promise.all([
      Task.aggregate([
        { $match: { assignedTo: worker._id } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
            inProgress: {
              $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] },
            },
            pending: {
              $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
            },
            totalEstimatedHours: { $sum: { $ifNull: ["$estimatedHours", 0] } },
            totalActualHours: { $sum: { $ifNull: ["$actualHours", 0] } },
          },
        },
      ]),
      Task.aggregate([
        {
          $match: {
            assignedTo: worker._id,
            completedAt: { $gte: startDate },
            status: "completed",
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$completedAt" },
            },
            completed: { $sum: 1 },
            hours: { $sum: { $ifNull: ["$actualHours", 0] } },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    const stats = taskStats[0] || {
      total: 0,
      completed: 0,
      inProgress: 0,
      pending: 0,
      totalEstimatedHours: 0,
      totalActualHours: 0,
    };

    res.json({
      worker: {
        id: worker._id,
        name: worker.name,
        department: worker.department,
      },
      stats,
      dailyPerformance,
      period,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get team statistics
// @route   GET /api/analytics/team/stats
exports.getTeamStatistics = async (req, res, next) => {
  try {
    const [departmentStats, topPerformers] = await Promise.all([
      Worker.aggregate([
        {
          $group: {
            _id: "$department",
            totalWorkers: { $sum: 1 },
            avgProductivity: { $avg: "$productivity" },
            avgRating: { $avg: "$averageRating" },
            totalCompleted: { $sum: "$totalTasksCompleted" },
          },
        },
        { $sort: { avgProductivity: -1 } },
      ]),
      Worker.find({ status: "active" })
        .sort("-productivity -totalTasksCompleted")
        .limit(10)
        .select(
          "name department productivity totalTasksCompleted averageRating",
        ),
    ]);

    res.json({ departmentStats, topPerformers });
  } catch (error) {
    next(error);
  }
};

// @desc    Get task completion rates
// @route   GET /api/analytics/tasks/completion-rates
exports.getTaskCompletionRates = async (req, res, next) => {
  try {
    const { period = "30d" } = req.query;

    let days;
    switch (period) {
      case "7d":
        days = 7;
        break;
      case "90d":
        days = 90;
        break;
      default:
        days = 30;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [byPriority, byDepartment, overallRate] = await Promise.all([
      Task.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: "$priority",
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            priority: "$_id",
            total: 1,
            completed: 1,
            rate: {
              $cond: [
                { $gt: ["$total", 0] },
                {
                  $round: [
                    { $multiply: [{ $divide: ["$completed", "$total"] }, 100] },
                    1,
                  ],
                },
                0,
              ],
            },
          },
        },
      ]),
      Task.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $lookup: {
            from: "workers",
            localField: "assignedTo",
            foreignField: "_id",
            as: "worker",
          },
        },
        { $unwind: { path: "$worker", preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: "$worker.department",
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
          },
        },
        {
          $project: {
            department: { $ifNull: ["$_id", "Unassigned"] },
            total: 1,
            completed: 1,
            rate: {
              $cond: [
                { $gt: ["$total", 0] },
                {
                  $round: [
                    { $multiply: [{ $divide: ["$completed", "$total"] }, 100] },
                    1,
                  ],
                },
                0,
              ],
            },
          },
        },
      ]),
      Task.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
            },
          },
        },
      ]),
    ]);

    const overall = overallRate[0] || { total: 0, completed: 0 };
    const overallCompletionRate =
      overall.total > 0
        ? Math.round((overall.completed / overall.total) * 100)
        : 0;

    res.json({
      overallCompletionRate,
      byPriority,
      byDepartment,
      period,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get time tracking data
// @route   GET /api/analytics/time-tracking
exports.getTimeTrackingData = async (req, res, next) => {
  try {
    const { period = "30d" } = req.query;

    let days;
    switch (period) {
      case "7d":
        days = 7;
        break;
      case "90d":
        days = 90;
        break;
      default:
        days = 30;
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [timeByWorker, dailyHours] = await Promise.all([
      Task.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate },
            assignedTo: { $exists: true },
          },
        },
        {
          $group: {
            _id: "$assignedTo",
            estimatedHours: { $sum: { $ifNull: ["$estimatedHours", 0] } },
            actualHours: { $sum: { $ifNull: ["$actualHours", 0] } },
            taskCount: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "workers",
            localField: "_id",
            foreignField: "_id",
            as: "worker",
          },
        },
        { $unwind: "$worker" },
        {
          $project: {
            workerName: "$worker.name",
            department: "$worker.department",
            estimatedHours: 1,
            actualHours: 1,
            taskCount: 1,
            efficiency: {
              $cond: [
                { $gt: ["$estimatedHours", 0] },
                {
                  $round: [
                    {
                      $multiply: [
                        { $divide: ["$actualHours", "$estimatedHours"] },
                        100,
                      ],
                    },
                    1,
                  ],
                },
                0,
              ],
            },
          },
        },
        { $sort: { actualHours: -1 } },
      ]),
      Task.aggregate([
        {
          $match: {
            completedAt: { $gte: startDate },
            status: "completed",
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$completedAt" },
            },
            totalHours: { $sum: { $ifNull: ["$actualHours", 0] } },
            tasksCompleted: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
    ]);

    res.json({
      timeByWorker,
      dailyHours,
      period,
    });
  } catch (error) {
    next(error);
  }
};
