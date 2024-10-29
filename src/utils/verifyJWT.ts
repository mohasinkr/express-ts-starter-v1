import jwt from "jsonwebtoken";
import getJWTSecret from "./getJWTSecret.js";

const verifyJWT = (token: string) => {
	const secret = getJWTSecret();
	try {
		const decoded = jwt.verify(token, secret);
		return decoded;
	} catch (error) {
		return error;
	}
};

export default verifyJWT;
