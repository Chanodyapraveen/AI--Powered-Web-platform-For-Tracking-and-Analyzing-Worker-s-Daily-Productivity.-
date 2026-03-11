require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Worker = require("../models/Worker");
const Task = require("../models/Task");

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Worker.deleteMany({});
    await Task.deleteMany({});
    console.log("Cleared existing data");

    // Create users
    const users = await User.create([
      {
        name: "Admin User",
        email: "admin@demo.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Manager User",
        email: "manager@demo.com",
        password: "manager123",
        role: "manager",
      },
      {
        name: "Worker User",
        email: "worker@demo.com",
        password: "worker123",
        role: "worker",
      },
      {
        name: "Jane Smith",
        email: "jane@demo.com",
        password: "worker123",
        role: "worker",
      },
      {
        name: "Bob Johnson",
        email: "bob@demo.com",
        password: "worker123",
        role: "worker",
      },
    ]);
    console.log("Users created");

    // Create workers
    const workers = await Worker.create([
      {
        user: users[2]._id,
        employeeId: "EMP001",
        name: "Worker User",
        email: "worker@demo.com",
        department: "Engineering",
        position: "Software Developer",
        phone: "555-0101",
        status: "active",
        skills: ["JavaScript", "React", "Node.js"],
        productivity: 85,
        totalTasksCompleted: 42,
        averageRating: 4.2,
      },
      {
        user: users[3]._id,
        employeeId: "EMP002",
        name: "Jane Smith",
        email: "jane@demo.com",
        department: "Engineering",
        position: "Frontend Developer",
        phone: "555-0102",
        status: "active",
        skills: ["HTML", "CSS", "React", "TypeScript"],
        productivity: 92,
        totalTasksCompleted: 58,
        averageRating: 4.7,
      },
      {
        user: users[4]._id,
        employeeId: "EMP003",
        name: "Bob Johnson",
        email: "bob@demo.com",
        department: "Design",
        position: "UI/UX Designer",
        phone: "555-0103",
        status: "active",
        skills: ["Figma", "Adobe XD", "Sketch"],
        productivity: 78,
        totalTasksCompleted: 35,
        averageRating: 4.0,
      },
    ]);
    console.log("Workers created");

    // Create tasks
    const now = new Date();
    const daysAgo = (d) => {
      const date = new Date(now);
      date.setDate(date.getDate() - d);
      return date;
    };

    await Task.create([
      {
        title: "Build user authentication module",
        description: "Implement login, register and JWT authentication",
        status: "completed",
        priority: "high",
        assignedTo: workers[0]._id,
        createdBy: users[1]._id,
        dueDate: daysAgo(-2),
        completedAt: daysAgo(1),
        estimatedHours: 16,
        actualHours: 14,
        tags: ["backend", "auth"],
      },
      {
        title: "Design dashboard layout",
        description: "Create responsive dashboard with charts and stats",
        status: "completed",
        priority: "high",
        assignedTo: workers[2]._id,
        createdBy: users[1]._id,
        dueDate: daysAgo(-1),
        completedAt: daysAgo(2),
        estimatedHours: 12,
        actualHours: 10,
        tags: ["design", "ui"],
      },
      {
        title: "Implement worker management page",
        description: "CRUD operations for worker profiles",
        status: "in_progress",
        priority: "medium",
        assignedTo: workers[1]._id,
        createdBy: users[1]._id,
        dueDate: daysAgo(-5),
        estimatedHours: 20,
        actualHours: 8,
        tags: ["frontend", "workers"],
      },
      {
        title: "Set up CI/CD pipeline",
        description:
          "Configure GitHub Actions for automated testing and deployment",
        status: "pending",
        priority: "medium",
        assignedTo: workers[0]._id,
        createdBy: users[0]._id,
        dueDate: daysAgo(-10),
        estimatedHours: 8,
        tags: ["devops"],
      },
      {
        title: "Create analytics charts",
        description: "Build productivity and performance chart components",
        status: "in_progress",
        priority: "high",
        assignedTo: workers[1]._id,
        createdBy: users[1]._id,
        dueDate: daysAgo(-7),
        estimatedHours: 24,
        actualHours: 12,
        tags: ["frontend", "charts"],
      },
      {
        title: "Write API documentation",
        description: "Document all REST API endpoints",
        status: "pending",
        priority: "low",
        assignedTo: workers[0]._id,
        createdBy: users[0]._id,
        dueDate: daysAgo(-14),
        estimatedHours: 6,
        tags: ["docs"],
      },
      {
        title: "Mobile responsive fixes",
        description: "Fix layout issues on mobile devices",
        status: "completed",
        priority: "medium",
        assignedTo: workers[2]._id,
        createdBy: users[1]._id,
        dueDate: daysAgo(0),
        completedAt: daysAgo(0),
        estimatedHours: 4,
        actualHours: 3,
        tags: ["design", "mobile"],
      },
      {
        title: "Implement notification system",
        description: "Build real-time notification feature",
        status: "pending",
        priority: "urgent",
        assignedTo: workers[1]._id,
        createdBy: users[0]._id,
        dueDate: daysAgo(-3),
        estimatedHours: 16,
        tags: ["frontend", "backend"],
      },
    ]);
    console.log("Tasks created");

    console.log("\n=== Seed completed successfully ===");
    console.log("\nDemo accounts:");
    console.log("  Admin:   admin@demo.com   / admin123");
    console.log("  Manager: manager@demo.com / manager123");
    console.log("  Worker:  worker@demo.com  / worker123");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedData();
