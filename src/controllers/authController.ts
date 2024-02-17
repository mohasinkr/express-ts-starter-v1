import hashPassword from "../utils/hashPassword";
import UserModel from "../models/user";

const authController = {
    async loginUser(req, res) {
        const { username, password } = req.body;
        const document = await UserModel.findOne({ username });
        const hashedPassword = hashPassword(password);
        if (document && hashedPassword) {
            if (document.password === hashedPassword) {
                return res.render('user', { title: "Login Page", name: document.username });
            }
        }
        return res.status(400).json("Wrong creds")
    },
    async addUser(req, res) {
        const { password, username } = req.body;
        const hashedPassword = hashPassword(password);

        console.log(hashedPassword);

        await UserModel.create({ username, password: hashedPassword });

        return res.send('ok');
    }
}

export default authController;