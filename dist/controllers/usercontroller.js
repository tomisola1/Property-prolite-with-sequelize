"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignin = exports.userSignup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database/database");
require("dotenv");
const secret = process.env.JWT_SECRET;
const days = process.env.JWT_EXPIRES_IN;
async function userSignup(req, res) {
    try {
        const { first_name, last_name, email, phoneNumber, address, password } = req.body;
        const userPassword = await bcryptjs_1.default.hash(password, 10);
        const data = {
            first_name, last_name, email, phoneNumber, address
        };
        database_1.pool.query('SELECT * FROM users WHERE email = $1', [email], (error, result) => {
            if (error) {
                throw error;
            }
            if (result.rows.length) {
                return res.status(400).send('email already exists');
            }
            database_1.pool.query('INSERT INTO users (first_name,last_name, email, phoneNumber, address, password) VALUES ($1, $2, $3, $4, $5, $6)', [first_name, last_name, email, phoneNumber, address, userPassword], (error, result) => {
                if (error) {
                    throw error;
                }
                return res.status(201).send({
                    status: 201,
                    data: data,
                    message: 'successful registration'
                });
            });
        });
    }
    catch (error) {
        console.log(error);
        res.send(error.message);
    }
}
exports.userSignup = userSignup;
async function userSignin(req, res) {
    try {
        const userEmail = req.body.email;
        const userpassword = req.body.password;
        database_1.pool.query('SELECT * FROM users WHERE email = $1', [userEmail], async (error, result) => {
            if (error) {
                throw error;
            }
            const { password } = result.rows[0];
            //    console.log(result);
            const validUser = await bcryptjs_1.default.compare(userpassword, password);
            const { id } = result.rows[0];
            const { first_name, last_name, email, phonenumber, address } = result.rows[0];
            const token = jsonwebtoken_1.default.sign({ id, email, phonenumber, address }, secret, {
                expiresIn: days
            });
            const data = {
                first_name, last_name, email, phonenumber, address, token
            };
            if (validUser) {
                return res.status(200).send({
                    status: 200,
                    data: data,
                    message: 'successfully logged in'
                });
            }
            else {
                res.send('invalid details');
            }
        });
    }
    catch (error) {
        res.send(error.message);
    }
}
exports.userSignin = userSignin;
