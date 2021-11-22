"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(200) UNIQUE NOT NULL,
    first_name VARCHAR(150) NOT NULL,
    last_name VARCHAR(150) NOT NULL,
    address VARCHAR(150) NOT NULL,
    password TEXT NOT NULL,
    phoneNumber VARCHAR(150) NOT NULL,
    is_admin BOOLEAN DEFAULT false NOT NULL
);`;
const propertyTable = `CREATE TYPE property_status as ENUM ('available','sold');
 CREATE TABLE IF NOT EXISTS property(
    id SERIAL PRIMARY KEY,
    owner INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status property_status DEFAULT 'available',
    price FLOAT NOT NULL,
    state VARCHAR(150) NOT NULL,
    city VARCHAR(150) NOT NULL,
    address VARCHAR(150) NOT NULL,
    type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_Url VARCHAR(500) NULL
);`;
const createTables = `${usersTable}${propertyTable}`;
exports.default = createTables;
