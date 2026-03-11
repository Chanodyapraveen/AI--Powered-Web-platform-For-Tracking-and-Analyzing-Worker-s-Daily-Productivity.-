const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    employeeId: {
      type: String,
      unique: true,
      required: [true, "Employee ID is required"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: "General",
    },
    position: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "on_leave"],
      default: "active",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    hireDate: {
      type: Date,
      default: Date.now,
    },
    productivity: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    totalTasksCompleted: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  },
);

// Index for searching
workerSchema.index({ name: "text", email: "text", department: "text" });

module.exports = mongoose.model("Worker", workerSchema);
