import type { Request, Response, NextFunction } from "express";
import { loginUserService, addUserService } from "@/services/auth.service.js";

const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { username, password } = req.body;
		const result = await loginUserService(username, password);
		res.status(result.statusCode).send(result.response);
	} catch (error) {
		next(error);
	}
};

const addUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { username, password, password_confirmation } = req.body;
		console.log(req.body, "req.body");
		const result = await addUserService(
			username,
			password,
			password_confirmation,
		);
		res.status(result.statusCode).json(result.response);
	} catch (error) {
		next(error);
	}
};

export { loginUser, addUser };
