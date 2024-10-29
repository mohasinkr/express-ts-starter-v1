import vine from "@vinejs/vine";

const authSchema = vine.object({
	username: vine.string(),
	password: vine.string().minLength(8).confirmed(),
});

export const authValidator = vine.compile(authSchema);
