require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// API versioning base path
const API_PREFIX = "/api/v1";

app.get("/", (req, res) => {
  res.json({
    message: "AnyThingAI Backend API",
    docs: "/api-docs (if configured) or use Postman collection",
  });
});

// Routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/tasks`, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});