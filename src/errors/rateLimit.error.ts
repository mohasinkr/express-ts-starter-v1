import CustomError from "@/errors/base.error.js";
import { ERROR_MESSAGES } from "@/utils/constants.js";

class RateLimitError extends CustomError {
	constructor(
		message: string = ERROR_MESSAGES.TOO_MANY_REQUESTS,
		statusCode = 429,
	) {
		super(message, statusCode);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default RateLimitError;
