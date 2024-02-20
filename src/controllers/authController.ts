import hashPassword from "../utils/hashPassword.js";
import UserModel from "../models/user.js";
import { checkValidation } from "../lib/checkValidation.js";

const authController = {
    async loginUser(req:any, res:any) {
        const { username, password } = req.body;
        const document = await UserModel.findOne({ username });
        const validationResult = await checkValidation({ username, password });
        const hashedPassword = hashPassword(password);
        if (document && hashedPassword) {
            if (document.password === hashedPassword) {
                return res.render('user', { title: "Login Page", name: document.username });
            }
        }
        return res.status(400).json("Wrong creds")
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