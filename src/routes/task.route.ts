import express from "express";
import { authenticationMiddleware } from "../middleware";
import { createTask, getAllTask } from "../controllers/task.controller";


const taskRoutes = express.Router()

taskRoutes.use(authenticationMiddleware)

taskRoutes.route("/").get(getAllTask)
taskRoutes.route("/create").post(createTask)

export default taskRoutes