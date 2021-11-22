"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userTable = 'DROP TABLE IF EXISTS users CASCADE;';
const propertyTable = 'DROP TABLE IF EXISTS property CASCADE;';
const dropTables = `${userTable}${propertyTable}`;
exports.default = dropTables;
