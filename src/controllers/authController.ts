import hashPassword from "../utils/hashPassword.js";
import UserModel from "../models/user.js";
import { checkValidation } from "../lib/checkValidation.js";
import { ERROR_MESSAGES } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import getJWTSecret from "@/utils/getJWTSecret";

const authController = {
    async loginUser(req:any, res:any) {
        const { username, password } = req.body;
        const document = await UserModel.findOne({ username });
        const validationResult = await checkValidation({ username, password });
        const hashedPassword = hashPassword(password);
        if (document && hashedPassword) {
            if (document.password === hashedPassword) {
               const token = jwt.sign({ title: "Login Page", name: document.username }, getJWTSecret(),{expiresIn: "24h"})
                // return res.render('user', { title: "Login Page", name: document.username });
                return res.json({
                    token
                })
            }
        }
        return res.status(401).json({
            success: true,
            message: ERROR_MESSAGES.INVALID_CREDENTIALS,
            data: null,
        })
    },
    async addUser(req:any, res:any) {
        const { password, username } = req.body;
        const hashedPassword = hashPassword(password);

        console.log(hashedPassword);

        await UserModel.create({ username, password: hashedPassword });

        return res.send('ok');
    }
}

export default authController;