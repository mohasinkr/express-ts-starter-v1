import crypto from "node:crypto";

export default function hashPassword(password: string) {
	return crypto
		.createHash("sha256")
		.update(password + process.env.SALT)
		.digest("hex");
}
