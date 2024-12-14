import type { Request, Response, NextFunction } from "express";
import vine from "@vinejs/vine";
import AuthenticationError from "@/errors/authentication.error.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";

export const validateRequest =
	(schema: ReturnType<typeof vine.object>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const compiledSchema = vine.compile(schema);

			await compiledSchema.validate(req.body);
			next();
		} catch (err) {
			console.log(err);
			next(new AuthenticationError(ERROR_MESSAGES.VALIDATION_FAILED, 422));
		}
	};
