"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignin = exports.userSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../models/user");
require("dotenv");
const secret = process.env.JWT_SECRET;
const days = process.env.JWT_EXPIRES_IN;
async function userSignup(req, res) {
    try {
        const { first_name, last_name, email, phoneNumber, address, password } = req.body;
        const userPassword = await bcryptjs_1.default.hash(password, 10);
        const data = { first_name, last_name, email, phoneNumber, address, password: userPassword };
        const user = await user_1.users.findOne({ where: { email: email } });
        if (user) {
            return res.status(400).send({ message: 'user already exists' });
        }
        const createdUser = await user_1.users.create(data);
        return res.status(201).send({
            message: "user created",
            data: createdUser
        });
    }
    catch (error) {
        console.log(error);
        return res.send(error.message);
    }
}
exports.userSignup = userSignup;
async function userSignin(req, res) {
    try {
        const userEmail = req.body.email;
        const userpassword = req.body.password;
        const user = await user_1.users.findOne({ where: { email: userEmail } });
        if (!user) {
            return res.status(404).send({ message: 'user does not exist' });
        }
        const { password } = user;
        const validUser = await bcryptjs_1.default.compare(userpassword, password);
        const token = jsonwebtoken_1.default.sign(user.dataValues, secret, {
            expiresIn: days
        });
        if (!validUser) {
            return res.status(400).send({ message: 'invalid details' });
        }
        return res.status(200).send({
            data: { token, user },
            message: 'successfully logged in'
        });
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
exports.userSignin = userSignin;
