import express, { Request, Response } from "express";
import connectToDatabase from "./db";
import userRoutes from "./routes/user.route";
import categoryRoutes from "./routes/category.route";
import taskRoutes from "./routes/task.route";

const application = express();

application.use(express.json());

const PORT = 1337;
connectToDatabase();

application.get("/ping", (request: Request, response: Response) => {
  return response.send("Pong");
});

application.use("/user", userRoutes);
application.use("/categories", categoryRoutes);
application.use("/tasks", taskRoutes);

application.listen(PORT, () => {
  console.log(`Server up and running on Port ${PORT}`);
});
