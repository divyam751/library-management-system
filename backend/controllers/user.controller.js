const { SECRET_KEY } = require("../constants");
const { User } = require("../models/user.model");
const { ApiResponse } = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return ApiResponse.error(res, [], 400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, [], 409, "Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await user.save();

    ApiResponse.success(
      res,
      { userId: user._id },
      201,
      "User registered successfully"
    );
  } catch (err) {
    console.error("Error in register:", err);
    ApiResponse.error(res, [err.message], 500, "Failed to register user");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return ApiResponse.error(res, [], 400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return ApiResponse.error(
        res,
        ["User not found"],
        404,
        "Invalid credentials"
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return ApiResponse.error(res, [], 401, "Invalid credentials");
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    ApiResponse.success(
      res,
      { token, fullname: user.fullname, role: user.role },
      200,
      "Login successful"
    );
  } catch (err) {
    console.error("Error in login:", err);
    ApiResponse.error(res, [err.message], 500, "Failed to log in");
  }
};

module.exports = {
  register,
  login,
};
