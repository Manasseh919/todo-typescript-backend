import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://manasseh919:mannamey@cluster0.gmdwubf.mongodb.net/task-todo"
    );
    if (connection) {
      console.log(`Connection established ${mongoose.connection.host}`);
    }
  } catch (error) {
    console.log("error connecting to database", error);
    throw error;
  }
};

export default connectToDatabase;
