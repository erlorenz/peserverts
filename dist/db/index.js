"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const AdminUser_1 = __importDefault(require("../models/AdminUser"));
const winston_1 = __importDefault(require("winston"));
const { DB_NAME, DB_PASSWORD, DB_USER, DB_SOCKET_NAME } = process.env;
// Decide which Knex config to use based on NODE_ENV
let config = {
    client: 'pg',
    connection: {
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    },
};
if (process.env.NODE_ENV === 'production')
    config = {
        client: 'pg',
        connection: {
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASSWORD,
            host: `/cloudsql/${DB_SOCKET_NAME}`,
        },
    };
// Initialize Knex and Objection
exports.default = async () => {
    const knex = knex_1.default(config);
    objection_1.Model.knex(knex);
    // Test if DB works by a simple request
    (async () => {
        try {
            await AdminUser_1.default.query();
            winston_1.default.info('Postgres Server Connected');
        }
        catch (e) {
            winston_1.default.warn('Postgres: ' + e.message);
        }
    })();
};
//# sourceMappingURL=index.js.map