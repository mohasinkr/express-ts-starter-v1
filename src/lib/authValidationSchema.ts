import vine from "@vinejs/vine";

const authSchema = vine.object({
    username: vine.string(),
    password: vine.string(),
})

export const authValidator = vine.compile(authSchema);