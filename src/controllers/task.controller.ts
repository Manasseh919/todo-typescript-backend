import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";

export const getAllTask = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.body;
    const tasks = await Task.find({
      user: userId,
    });
    response.send(tasks)
  } catch (error) {
    console.log("error getting alltask", error);
    response.send({error:"Error fetching task"})
    throw error;
  }
};
