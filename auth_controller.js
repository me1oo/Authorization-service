const User = require('./models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require("./config");

const generateAccessToken = (id) => {
    payload = {
        id
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}


class authController {

    async registration (req, res) {
        try{
            const errors = validationResult(req);
                if(!errors.isEmpty()) {
                    return res.status(400).json({message: "Ошибка при регистрации", errors});
                }
            const { username, password} = req.body;
            const candidate = await User.findOne({username});
            if(candidate) {
                return res.status(400).json({message: "Пользователь с таким имененм уже существует"});
            }
            const user = new User({username, password});
            await user.save();
            return res.json({message: "Пользователь успешно зарегестрирован"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login (req, res) {
        try{
            const { username, password } = req.body;
            const user = await User.findOne({username});
                if(!user) {
                    return res.status(400).json({ message: `Пользователь "${username}" не найден`});
                }
            const validPassword = (password == user.password);
                if (!validPassword) {
                    return res.status(400).json({ message: `Введен не верный пароль`});
                }
            const token = generateAccessToken(user._id);
            return res.json({ token: token, message: `Вы успешно вошли в систему, ${username} !`});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

}



module.exports = new authController();

