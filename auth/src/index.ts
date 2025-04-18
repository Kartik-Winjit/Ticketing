import mongoose from "mongoose";
import { app } from "./app";
import { log } from "console";
const start = async () => {
  console.log("Testing...");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to db");
  } catch (error) {
    console.error(error);
  }
  app.listen(3000, () => {
    console.log("Listening on 3000!");
  });
};

start();
