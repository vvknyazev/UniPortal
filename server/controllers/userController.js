const User = require('../models/user')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

class UserController {
    async login(req, res){
        const {username, password} = req.body
        const user = await User.findOne({username});
        if (!user) {
            return res.sendStatus(401);
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (comparePassword && username === user.username) {
            res.cookie('user', username, { httpOnly: true });
            res.json({ success: true, message: 'Login successful' });
        } else{
            return res.sendStatus(401);
        }
    }
    async logout(req, res){
        res.clearCookie('user', { httpOnly: true });
        res.json({ success: true, message: 'Logout successful' });
    }

    async createUser(req ,res){
        const {username, email, password, name} = req.body;

        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            username,
            email,
            password: hashPassword,
            name,

        });
        await user.save();
        return res.json(user);
    }

    async checkLogin(req, res) {
        const user = req.cookies.user;
        if (user) {
            res.json({ loggedIn: true, user });
        } else {
            res.json({ loggedIn: false });
        }
    }
}

module.exports = new UserController();