import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";

export const getAllTask = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error getting alltask", error);
    response.send({ error: "Error fetching task" });
    throw error;
  }
};

export const createTask = async (request: AuthRequest, response: Response) => {
  try {
    const userId = request.user;
    const { name, date, categoryId }: ITask = request.body;

    const task = await Task.create({
      categoryId,
      name,
      date,
      user: userId,
    });
    response.send(task);
  } catch (error) {
    console.log("error creating task", error);
    response.send({ error: "error whiles creating task" });
    throw error;
  }
};
