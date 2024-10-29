export const authMiddleware = (req: any, res: any, next: any) => {
	console.log(req);
	next();
};
