const { validationResult } = require("express-validator");
const Worker = require("../models/Worker");
const Task = require("../models/Task");

// @desc    Get all workers
// @route   GET /api/workers
exports.getAllWorkers = async (req, res, next) => {
  try {
    const {
      search,
      department,
      status,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
      ];
    }

    if (department) query.department = department;
    if (status) query.status = status;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [workers, total] = await Promise.all([
      Worker.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate("user", "name email role"),
      Worker.countDocuments(query),
    ]);

    res.json({
      workers,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get worker by ID
// @route   GET /api/workers/:id
exports.getWorkerById = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.params.id).populate(
      "user",
      "name email role",
    );

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({ worker });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new worker
// @route   POST /api/workers
exports.createWorker = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { employeeId, email } = req.body;

    const existingWorker = await Worker.findOne({
      $or: [{ employeeId }, { email }],
    });
    if (existingWorker) {
      return res
        .status(400)
        .json({
          message: "Worker with this employee ID or email already exists",
        });
    }

    const worker = await Worker.create(req.body);

    res.status(201).json({
      worker,
      message: "Worker created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update worker
// @route   PUT /api/workers/:id
exports.updateWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.json({
      worker,
      message: "Worker updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete worker
// @route   DELETE /api/workers/:id
exports.deleteWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findByIdAndDelete(req.params.id);

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Unassign tasks that were assigned to this worker
    await Task.updateMany(
      { assignedTo: req.params.id },
      { $unset: { assignedTo: "" } },
    );

    res.json({ message: "Worker deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Get worker statistics
// @route   GET /api/workers/:id/stats
exports.getWorkerStats = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    const [taskStats] = await Task.aggregate([
      { $match: { assignedTo: worker._id } },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          pendingTasks: {
            $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] },
          },
          inProgressTasks: {
            $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] },
          },
          totalEstimatedHours: { $sum: { $ifNull: ["$estimatedHours", 0] } },
          totalActualHours: { $sum: { $ifNull: ["$actualHours", 0] } },
        },
      },
    ]);

    const stats = taskStats || {
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      totalEstimatedHours: 0,
      totalActualHours: 0,
    };

    const completionRate =
      stats.totalTasks > 0
        ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
        : 0;

    res.json({
      worker: worker.name,
      stats: {
        ...stats,
        completionRate,
        productivity: worker.productivity,
        averageRating: worker.averageRating,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get worker's tasks
// @route   GET /api/workers/:id/tasks
exports.getWorkerTasks = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query = { assignedTo: req.params.id };
    if (status) query.status = status;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort("-createdAt")
        .skip(skip)
        .limit(limitNum)
        .populate("createdBy", "name"),
      Task.countDocuments(query),
    ]);

    res.json({
      tasks,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};
