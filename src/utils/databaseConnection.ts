import mongoose, { type ConnectOptions } from "mongoose";

mongoose.Promise = global.Promise;

const connectToDatabase = async (): Promise<void> => {
	const options: ConnectOptions = {};

	const dbUrl = process.env.MONGODB_URL as string;

	await mongoose.connect(dbUrl, options);
	console.log(mongoose.connection.readyState === 1 && "db connected");
};

export { connectToDatabase };
