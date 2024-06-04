import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import {IUser} from "../types/index"

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticationUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticationUserToken;
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(409).send("user already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("Error creating user", error);
    throw error;
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).send({ message: "User doesnt exist" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordCorrect) {
      const token = getUserToken(existingUser._id);
      return response.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return response.status(400).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log("error logging in", error);
    throw error;
  }
};
