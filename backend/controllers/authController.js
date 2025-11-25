const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

function validateRegister(data) {
  let errors = [];

  if (!data.name || data.name.trim() === "") {
    errors.push("Name is required");
  }
  if (!data.email || !data.email.includes("@")) {
    errors.push("Valid email is required");
  }
  if (!data.password || data.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return errors;
}

function validateLogin(data) {
  let errors = [];

  if (!data.email || !data.email.includes("@")) {
    errors.push("Valid email is required");
  }
  if (!data.password) {
    errors.push("Password is required");
  }

  return errors;
}


// REGISTER
const registerUser = async (req, res, next) => {
  try {
    const errors = validateRegister(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { name, email, password, role } = req.body;

    // check if email exists
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role === "admin" ? "admin" : "user",
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};


// LOGIN
const loginUser = async (req, res, next) => {
  try {
    const errors = validateLogin(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.json({
      message: "Logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, loginUser };