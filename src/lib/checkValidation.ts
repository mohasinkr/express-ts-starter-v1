import { errors } from "@vinejs/vine";
import { authValidator } from "./authValidationSchema.js";

type AuthType = {
	username: string;
	password: string;
	password_confirmation: string;
};

export async function checkAuthValidation(data: AuthType) {
	try {
		return await authValidator.validate(data);
	} catch (error) {
		if (error instanceof errors.E_VALIDATION_ERROR) {
			console.log(error.messages, "error from checkAuthValidation");
		}
	}
	return null;
}
