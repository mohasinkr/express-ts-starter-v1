import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

mongoose.Promise = global.Promise;
dotenv.config();

const connectToDatabase = async (): Promise<void> => {
  const options: ConnectOptions = {};

  const dbUrl = process.env.MONGODB_URL as string;

  await mongoose.connect(dbUrl, options);
  console.log(mongoose.connection.readyState === 1 && "db connected");
};

export { connectToDatabase };
