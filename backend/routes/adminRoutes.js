const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const adminMiddleware = require(
  "../middleware/adminMiddleware"
);

const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getActivityLogs,
  getAnalytics
} = require(
  "../controllers/adminController"
);

router.use(
  authMiddleware,
  adminMiddleware
);


// USERS

router.get(
  "/users",
  getAllUsers
);

router.delete(
  "/users/:id",
  deleteUser
);

router.patch(
  "/users/:id/status",
  updateUserStatus
);


// TASKS

router.get(
  "/tasks",
  getAllTasks
);

router.delete(
  "/tasks/:id",
  deleteAnyTask
);


// LOGS

router.get(
  "/logs",
  getActivityLogs
);


// ANALYTICS

router.get(
  "/analytics",
  getAnalytics
);

module.exports = router;