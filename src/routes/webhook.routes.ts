import { Router } from "express";

const webhookRouter = Router();
webhookRouter.post("/", (req, res) => {
	console.log(req.body);
	res.send("ok");
});

export default webhookRouter;
