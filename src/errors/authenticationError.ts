// src/errors/authenticationError.ts
import CustomError from "@/errors/customError.js";

class AuthenticationError extends CustomError {
  constructor(message: string, statusCode = 401) {
    super(message, statusCode);
    this.name = this.constructor.name; // Set the error name to the class name
    Error.captureStackTrace(this, this.constructor); // Maintain stack trace
  }
}

export default AuthenticationError;
