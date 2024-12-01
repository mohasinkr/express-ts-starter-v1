import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
	return res.render("list-users", { title: "Login Page", name: "Mohasin" });
});

export default userRouter;
