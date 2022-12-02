const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./router/auth");
const subTaskRoute = require("./router/subtasks");
const projectRoutes = require("./router/projects");
const tasksRoutes = require("./router/tasks");
const departmentsRoutes = require("./router/departments");
const employeesRoute = require("./router/employees");
const usersRoutes = require("./router/users");
const app = express();
dotenv.config();

// function to connect to db
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      throw err;
    });
};
//middlewares
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());

// routes
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", tasksRoutes);
app.use("/api/v1/departments", departmentsRoutes);
app.use("/api/v1/employees", employeesRoute);
app.use("/api/v1/subtask", subTaskRoute);
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
app.listen(8800, () => {
  connect();
  console.log("Connected to server on port 8800");
});
