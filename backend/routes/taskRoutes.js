
const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const taskOwnerMiddleware = require(
  "../middleware/taskOwnerMiddleware"
);

const {
  createTask,
  getMyTasks,
  getSingleTask,
  updateTask,
  deleteTask
} = require(
  "../controllers/taskController"
);

router.post(
  "/",
  authMiddleware,
  createTask
);

router.get(
  "/",
  authMiddleware,
  getMyTasks
);

router.get(
  "/:id",
  authMiddleware,
  getSingleTask
);

router.put(
  "/:id",
  authMiddleware,
  taskOwnerMiddleware,
  updateTask
);

router.delete(
  "/:id",
  authMiddleware,
  taskOwnerMiddleware,
  deleteTask
);

module.exports = router;