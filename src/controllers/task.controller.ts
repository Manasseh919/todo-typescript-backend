import { Request, Response } from "express";
import { AuthRequest } from "../middleware";
import Task from "../models/task-model";
import { ITask } from "../types";
import { request } from "http";
import { error } from "console";

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

export const getAllTasksByCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const { id } = request.params;
    const tasks = await Task.find({
      user: userId,
      categoryId: id,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getAllTasksByCategory", error);
    response.send({ error: "Error while fetching tasks" });
    throw error;
  }
};

export const getAllComletedTask = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const tasks = await Task.find({
      user: userId,
      isCompleted: true,
    });
    response.send(tasks);
  } catch (error) {
    console.log("error getting all comleted task", error);
    response.send({ error: "Error while fetching completed tasks" });
    throw error;
  }
};
export const getTasksForToday = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const userId = request.user;
    const todaysISODate = new Date();
    todaysISODate.setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      user: userId,
      date: todaysISODate.toISOString(),
    });
    response.send(tasks);
  } catch (error) {
    console.log("error in getTasksForToday", error);
    response.send({ error: "Error while fetching tasks" });
    throw error;
  }
};

export const toggleTaskStatus = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { isCompleted } = request.body;
    const { id } = request.params;

    const task = await Task.updateOne(
      { _id: id },
      {
        isCompleted,
      }
    );
    response.send({ message: "Toggle status updated" });
  } catch (error) {
    console.log("error getting status", error);
    response.send({ error: "Error while toggling status task" });
    throw error;
  }
};

export const deleteTask = async (request: AuthRequest, response: Response) => {
  try {
    const { id } = request.params
    await Task.deleteOne({
      _id: id,
    })
    response.send({ message: "Task deleted" })
  } catch (error) {
    console.log("error in deleteTask", error)
    response.send({ error: "Error while deleting task" })
    throw error
  }
}

export const editTask = async (request: AuthRequest, response: Response) => {
  try {
    const { _id, categoryId, date, name }: ITask = request.body
    await Task.updateOne(
      {
        _id,
      },
      {
        $set: {
          name,
          categoryId,
          date,
        },
      }
    )
    response.send({ message: "Task updated successfully" })
  } catch (error) {
    console.log("error in editTask", error)
    response.send({ error: " Error while updating the task" })
    throw error
  }
}
