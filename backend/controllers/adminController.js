const User = require("../models/User");
const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");


// GET ALL USERS

exports.getAllUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// DELETE USER

exports.deleteUser = async (req, res) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await Task.deleteMany({
      createdBy: user._id
    });

    await user.deleteOne();

    await ActivityLog.create({
      user: req.user.id,
      action: "DELETE_USER",
      details: `Deleted user ${user.email}`
    });

    res.json({
      message: "User deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// UPDATE USER STATUS

exports.updateUserStatus = async (
  req,
  res
) => {

  try {

    const user = await User.findById(
      req.params.id
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    user.status = req.body.status;

    await user.save();

    await ActivityLog.create({
      user: req.user.id,
      action: "UPDATE_USER_STATUS",
      details: `${user.email} changed to ${user.status}`
    });

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET ALL TASKS

exports.getAllTasks = async (
  req,
  res
) => {

  try {

    const tasks = await Task.find()
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        createdAt: -1
      });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// DELETE ANY TASK

exports.deleteAnyTask = async (
  req,
  res
) => {

  try {

    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await ActivityLog.create({
      user: req.user.id,
      action: "ADMIN_DELETE_TASK",
      details: task.title
    });

    await task.deleteOne();

    res.json({
      message: "Task deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};


// GET ACTIVITY LOGS

exports.getActivityLogs =
  async (req, res) => {

    try {

      const logs =
        await ActivityLog.find()
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1
          });

      res.json(logs);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };


// ANALYTICS

exports.getAnalytics =
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalTasks =
        await Task.countDocuments();

      const completedTasks =
        await Task.countDocuments({
          status: "Completed"
        });

      const pendingTasks =
        await Task.countDocuments({
          status: "Pending"
        });

      res.json({
        totalUsers,
        totalTasks,
        completedTasks,
        pendingTasks
      });

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }
  };