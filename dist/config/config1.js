"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Sequelize } = require('sequelize');
let isTestEnv = process.env.NODE_ENV === "test";
const db = new Sequelize(isTestEnv ? 'kobodb_sequelize_test' : 'kobodb_sequelize', 'postgres', 'postgres', {
    host: 'localhost',
    port: '5433',
    dialect: 'postgres'
});
exports.default = db;
