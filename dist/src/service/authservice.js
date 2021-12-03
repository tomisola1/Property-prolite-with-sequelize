"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthQueries {
    static async register(data) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [data[2]]);
        if (result.rows.length) {
            return {
                error: "existing user"
            };
        }
        const insertion = await pool.query('INSERT INTO users (first_name,last_name, email, phoneNumber, address, password) VALUES ($1, $2, $3, $4, $5, $6)', data);
        return insertion;
    }
    static async login(email, password) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
            return {
                error: "user does not exist"
            };
        }
        return result;
    }
}
exports.default = AuthQueries;
