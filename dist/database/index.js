"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const createtables_1 = __importDefault(require("./createtables"));
const droptables_1 = __importDefault(require("./droptables"));
const queryTable = () => {
    const populateTable = `${droptables_1.default}${createtables_1.default}`;
    database_1.pool.query(populateTable)
        .then(() => console.log('table created successfully'))
        .catch((err) => console.log('error', err));
};
queryTable();
