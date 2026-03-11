const { validationResult } = require("express-validator");
const Task = require("../models/Task");
const Worker = require("../models/Worker");

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getAllTasks = async (req, res, next) => {
  try {
    const {
      search,
      status,
      priority,
      assignedTo,
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;

    // If user is a worker, only show their assigned tasks
    if (req.user.role === "worker") {
      const worker = await Worker.findOne({ user: req.user._id });
      if (worker) {
        query.assignedTo = worker._id;
      } else {
        return res.json({
          tasks: [],
          pagination: { page: 1, limit: 10, total: 0, pages: 0 },
        });
      }
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const [tasks, total] = await Promise.all([
      Task.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limitNum)
        .populate("assignedTo", "name employeeId")
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

// @desc    Get task by ID
// @route   GET /api/tasks/:id
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "name employeeId email")
      .populate("createdBy", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const taskData = {
      ...req.body,
      createdBy: req.user._id,
    };

    const task = await Task.create(taskData);
    await task.populate("assignedTo", "name employeeId");
    await task.populate("createdBy", "name");

    res.status(201).json({
      task,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      task,
      message: "Task updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status
// @route   PATCH /api/tasks/:id/status
exports.updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (
      !["pending", "in_progress", "completed", "cancelled"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updateData = { status };
    if (status === "completed") {
      updateData.completedAt = new Date();
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update worker's completed task count if status is completed
    if (status === "completed" && task.assignedTo) {
      await Worker.findByIdAndUpdate(task.assignedTo._id, {
        $inc: { totalTasksCompleted: 1 },
      });
    }

    res.json({
      task,
      message: "Task status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Assign task to worker
// @route   PATCH /api/tasks/:id/assign
exports.assignTask = async (req, res, next) => {
  try {
    const { workerId } = req.body;

    if (workerId) {
      const worker = await Worker.findById(workerId);
      if (!worker) {
        return res.status(404).json({ message: "Worker not found" });
      }
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { assignedTo: workerId || null },
      { new: true, runValidators: true },
    )
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({
      task,
      message: workerId
        ? "Task assigned successfully"
        : "Task unassigned successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get tasks by status
// @route   GET /api/tasks/status/:status
exports.getTasksByStatus = async (req, res, next) => {
  try {
    const { status } = req.params;

    if (
      !["pending", "in_progress", "completed", "cancelled"].includes(status)
    ) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const tasks = await Task.find({ status })
      .sort("-createdAt")
      .populate("assignedTo", "name employeeId")
      .populate("createdBy", "name");

    res.json({ tasks });
  } catch (error) {
    next(error);
  }
};
