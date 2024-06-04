import express from "express";
import { authenticationMiddleware } from "../middleware";
import { createTask, getAllComletedTask, getAllTask, getAllTasksByCategory, getTasksForToday, toggleTaskStatus } from "../controllers/task.controller";


const taskRoutes = express.Router()

taskRoutes.use(authenticationMiddleware)

taskRoutes.route("/").get(getAllTask)
taskRoutes.route("/tasks-by-categories/:id").get(getAllTasksByCategory)
taskRoutes.route("/completed").get(getAllComletedTask)
taskRoutes.route("/today").get(getTasksForToday)
taskRoutes.route("/create").post(createTask)
taskRoutes.route("/update/:id").put(toggleTaskStatus)

export default taskRoutes