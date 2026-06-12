const User = require("../models/User");
const ActivityLog = require("../models/ActivityLog");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    await ActivityLog.create({
      user: user._id,
      action: "REGISTER",
      details: `${user.name} registered`
    });

    res.status(201).json({
      message:
        "User Registered Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    if (user.status === "Inactive") {
      return res.status(403).json({
        message:
          "Account Disabled"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid Credentials"
      });
    }

    await ActivityLog.create({
      user: user._id,
      action: "LOGIN",
      details: `${user.name} logged in`
    });

    const token =
      generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.profile = async (
  req,
  res
) => {
  const user = await User.findById(
    req.user.id
  ).select("-password");

  res.json(user);
};