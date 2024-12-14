import vine from "@vinejs/vine";

export const loginSchema = vine.object({
	username: vine.string(),
	password: vine.string(),
});
