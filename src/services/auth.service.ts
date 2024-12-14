import UserModel from "@/models/user.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";
import getJWTSecret from "@/utils/getJWTSecret.js";
import hashPassword from "@/utils/hashPassword.js";
import jwt from "jsonwebtoken";
import { checkAuthValidation } from "@/lib/checkValidation.js";
import AuthenticationError from "@/errors/authentication.error.js";
import CustomError from "@/errors/base.error.js";

interface ServiceResponse {
	statusCode: number;
	response: {
		success: boolean;
		message: string;
		data: any;
	};
}

const loginUserService = async (
	username: string,
	password: string,
): Promise<ServiceResponse> => {
	try {
		if (!username || !password) {
			throw new AuthenticationError(ERROR_MESSAGES.MISSING_CREDENTIALS, 400);
		}

		const document = await UserModel.findOne({ username });
		const hashedPassword = hashPassword(password);

		if (!document || document.password !== hashedPassword) {
			console.log("error ");
			throw new AuthenticationError(ERROR_MESSAGES.INVALID_CREDENTIALS, 401);
		}

		const token = jwt.sign(
			{ userId: document._id, username: document.username },
			getJWTSecret(),
			{ expiresIn: "24h" },
		);

		return {
			statusCode: 200,
			response: {
				success: true,
				message: "Login successful",
				data: { token },
			},
		};
	} catch (error) {
		if (error instanceof AuthenticationError) {
			throw error;
		}
		console.error("Unexpected error in loginUserService:", error);
		throw new CustomError(ERROR_MESSAGES.SERVER_ERROR, 500);
	}
};

const addUserService = async (
	username: string,
	password: string,
	password_confirmation: string,
): Promise<ServiceResponse> => {
	const validation = await checkAuthValidation({
		username,
		password,
		password_confirmation,
	});

	if (!validation) {
		console.log("validation erorr");
		throw new AuthenticationError(ERROR_MESSAGES.VALIDATION_FAILED, 400);
	}

	const existingUser = await UserModel.findOne({
		username: validation.username,
	});
	if (existingUser) {
		return {
			statusCode: 409,
			response: {
				success: false,
				message: ERROR_MESSAGES.USER_EXISTS,
				data: null,
			},
		};
	}

	const hashedPassword = hashPassword(password);
	const newUser = await UserModel.create({
		username,
		password: hashedPassword,
	});

	const token = jwt.sign(
		{ userId: newUser._id, username: newUser.username },
		getJWTSecret(),
		{ expiresIn: "24h" },
	);

	return {
		statusCode: 201,
		response: {
			success: true,
			message: "User created successfully",
			data: { token },
		},
	};
};

export { loginUserService, addUserService };
