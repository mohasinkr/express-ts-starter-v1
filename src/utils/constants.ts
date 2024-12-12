// Error codes
const ERROR_CODES = {
	INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
};

const ERROR_MESSAGES = {
	VALIDATION_FAILED: "Validation failed. Please check your input.",
	DATABASE_ERROR: "An error occurred while interacting with the database.",
	RESOURCE_NOT_FOUND: "The requested resource could not be found.",
	FORBIDDEN: "You do not have permission to access this resource.",
	CONFLICT: "A conflict occurred with the current state of the resource.",
	TOO_MANY_REQUESTS: "You have made too many requests. Please try again later.",
	SERVER_ERROR: "Internal server error. Please try again later.",
	UNAUTHORIZED: "You are not authorized to perform this action.",
	MISSING_CREDENTIALS: "Missing username or password.",
	INVALID_CREDENTIALS: "Invalid username or password.",
	USER_EXISTS: "A user with this username already exists.",
	OPERATION_NOT_ALLOWED: "The operation is not allowed.",
};

export { ERROR_CODES, ERROR_MESSAGES };
