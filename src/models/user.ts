// create a mongodb model for me

import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export default model("User", userSchema);
