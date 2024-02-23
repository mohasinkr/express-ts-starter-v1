import { authValidator } from "./authValidationSchema.js"
import { errors } from "@vinejs/vine";

export async function checkValidation(data: any) {
    try {
        return await authValidator.validate(data);
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            console.log(error);
        }
    }
    return null;
}   