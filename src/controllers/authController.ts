import hashPassword from "../utils/hashPassword.js";
import UserModel from "../models/user.js";
import { checkValidation } from "../lib/checkValidation.js";
import { ERROR_MESSAGES } from "../utils/constants.js";
import jwt from "jsonwebtoken";
import getJWTSecret from "@/utils/getJWTSecret";
import { Request, Response } from "express";

const authController = {
    async loginUser(req: Request, res: Response) {
        const { username, password } = req.body;
        const document = await UserModel.findOne({ username });
        const validationResult = await checkValidation({ username, password });
        const hashedPassword = hashPassword(password);
        if (document && hashedPassword) {
            if (document.password === hashedPassword) {
                const token = jwt.sign({ title: "Login Page", name: document.username }, getJWTSecret(), { expiresIn: "24h" })
                // return res.render('user', { title: "Login Page", name: document.username });
                // return res.json({
                //     data: {
                //         token
                //     }
                // })
                res.status(201).cookie("token",token, {expires: new Date(Date.now() + 24 * 3600000)})
                return res.send("cookie send")
            }
        }
        return res.status(401).json({
            success: true,
            message: ERROR_MESSAGES.INVALID_CREDENTIALS,
            data: null,
        })
    },
    async addUser(req: Request, res: Response) {
        const { password, username } = req.body;
        //checking if username is already present in db
        const document = await UserModel.findOne({ username });
        if (document) {
            return res.json({
                success: false,
                message: 'User already exists',
                data: null
            })
        }
        const hashedPassword = hashPassword(password);

        console.log(hashedPassword);

        await UserModel.create({ username, password: hashedPassword });
        const token = jwt.sign({ title: "Login Page", name: document.username }, getJWTSecret(), { expiresIn: "24h" })
        // return res.json({
        //     success: true,
        //     message: 'User created successfully',
        //     data: {
        //         token
        //     }
        // })
        res.status(201).cookie("token",token, {expires: new Date(Date.now() + 24 * 3600000),httpOnly: true})
        return res.send("Cookie set")
    }
}

export default authController;