import { Request, Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { user } = request;
    const categories = await Category.find({
      user: user,
    });
    return response.send(categories);
  } catch (error) {
    console.log("erro getting categories", error);
    response.send({ error: "something went wrong" });
    throw error;
  }
};

export const createCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const { color, icon, isEditable, name }: ICategory = request.body;
    const { user } = request;

    const category = await Category.create({
      color,
      icon,
      isEditable,
      name,
      user,
    });
    return response.send(category);
  } catch (error) {
    console.log("error creatign category", error);
    response.send({ error: "something went wrong" });
    throw error;
  }
};

export const deleteCategory = async (
  request: AuthRequest,
  response: Response
) => {
  try {
    const {id} = request.params
    await Category.deleteOne({_id:id})
    response.send({message:"Category deleted successfully"})
  } catch (error) {
    console.log("error deleting category", error);
    response.send({ error: "something went wrong" });
    throw error;
  }
};


export const updateCategory = async (
    request: AuthRequest,
    response: Response
  ) => {
    try {
      const { _id, color, icon, isEditable, name }: ICategory = request.body
      await Category.updateOne(
        {
          _id,
        },
        {
          $set: {
            name,
            color,
            icon,
            isEditable,
          },
        }
      )
      response.send({ message: "Category updated successfully" })
    } catch (error) {
      console.log("error in updateCategory", error)
      response.send({ error: "Error in updating the category" })
      throw error
    }
  }