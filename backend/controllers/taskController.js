const Task = require("../models/Task");
const ActivityLog = require(
  "../models/ActivityLog"
);

exports.createTask = async (
  req,
  res
) => {
  try {
    const {
      title,
      description
    } = req.body;

    const task =
      await Task.create({
        title,
        description,
        createdBy: req.user.id
      });

    await ActivityLog.create({
      user: req.user.id,
      action: "CREATE_TASK",
      details: `Task Created: ${title}`
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMyTasks = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const skip =
      (page - 1) * limit;

    const search =
      req.query.search || "";

    const status =
      req.query.status;

    let query = {
      createdBy: req.user.id
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i"
      };
    }

    if (status) {
      query.status = status;
    }

    const tasks =
      await Task.find(query)
        .sort({
          createdAt: -1
        })
        .skip(skip)
        .limit(limit);

    const total =
      await Task.countDocuments(
        query
      );

    res.json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(
        total / limit
      ),
      total
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getSingleTask =
  async (req, res) => {
    try {
      const task =
        await Task.findById(
          req.params.id
        );

      if (!task) {
        return res
          .status(404)
          .json({
            message:
              "Task not found"
          });
      }

      if (
        task.createdBy.toString() !==
        req.user.id
      ) {
        return res
          .status(403)
          .json({
            message:
              "Unauthorized"
          });
      }

      res.json(task);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

exports.updateTask = async (
  req,
  res
) => {
  try {
    const task = req.task;

    const {
      title,
      description,
      status
    } = req.body;

    task.title =
      title || task.title;

    task.description =
      description ||
      task.description;

    task.status =
      status || task.status;

    await task.save();

    await ActivityLog.create({
      user: req.user.id,
      action: "UPDATE_TASK",
      details: `Task Updated: ${task.title}`
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteTask = async (
  req,
  res
) => {
  try {
    const task = req.task;

    await ActivityLog.create({
      user: req.user.id,
      action: "DELETE_TASK",
      details: `Task Deleted: ${task.title}`
    });

    await task.deleteOne();

    res.json({
      message:
        "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};