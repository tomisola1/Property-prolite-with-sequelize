"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) UNIQUE NOT NULL, 
    ​first_name VARCHAR(150) NOT NULL, 
    last_name ​VARCHAR(150) NOT NULL,​ 
    password TEXT NOT NULL
    phoneNumber VARCHAR(11) NOT NULL,​ 
    address VARCHAR(300) NOT NULL,​ 
    is_admin​ BOOLEAN DEFAULT false NOT NULL,

)
`;
const createTables = `${usersTable}`;
exports.default = createTables;
