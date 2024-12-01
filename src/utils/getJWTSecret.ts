const getJWTSecret = () => {
	return process.env.JWT_SECRET || "";
};

export default getJWTSecret;
