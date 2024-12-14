import vine from "@vinejs/vine";

export const signupSchema = vine.object({
	username: vine.string(),
	password: vine
		.string()
		.minLength(8)
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
		)
		.confirmed(),
});
