"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
function Auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send('Please provide token');
    }
    if (token) {
        jsonwebtoken_1.default.verify(token, secret, (error, decoded) => {
            if (error) {
                return res.status(401).send('The Token provided is invalid');
            }
            req.user = decoded;
        });
    }
    return next();
}
exports.Auth = Auth;
