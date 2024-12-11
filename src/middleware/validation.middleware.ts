import type { Request, Response, NextFunction } from "express";
import vine from "@vinejs/vine";
import AuthenticationError from "@/errors/authenticationError.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";

export const validateRequest =
	(schema: ReturnType<typeof vine.object>) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const compiledSchema = vine.compile(schema);

			await compiledSchema.validate(req.body);

			next();
		} catch (err) {
			throw new AuthenticationError(ERROR_MESSAGES.VALIDATION_FAILED, 422);
		}
	};
