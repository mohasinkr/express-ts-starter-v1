import UserModel from "@/models/user.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";

const createUser = async (userData: { username: string; password: string }) => {
	// Check if the user already exists
	const existingUser = await UserModel.findOne({ username: userData.username });

	if (existingUser) {
		throw new Error(ERROR_MESSAGES.USER_EXISTS);
	}

	return await UserModel.create(userData);
};

export { createUser };
