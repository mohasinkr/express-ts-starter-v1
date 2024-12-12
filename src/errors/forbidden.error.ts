import CustomError from "./base.error.js";

class ForbiddenError extends CustomError {
	constructor(message: string, statusCode = 403) {
		super(message, statusCode);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default ForbiddenError;
