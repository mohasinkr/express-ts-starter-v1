import type { NextFunction, Request, Response } from "express";

const errorHandlerMiddleware = async (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.log("error captured!");
	console.log(err);
	res.status(200).json({
		message: "internal server error!",
	});
};

export default errorHandlerMiddleware;
