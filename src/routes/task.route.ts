import express from "express";
import { authenticationMiddleware } from "../middleware";
import { getAllTask } from "../controllers/task.controller";


const taskRoutes = express.Router()

taskRoutes.use(authenticationMiddleware)

taskRoutes.route("/").get(getAllTask)

export default taskRoutes