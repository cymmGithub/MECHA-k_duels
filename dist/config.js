"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_DATABASE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_HOST = exports.PORT = void 0;
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 3000;
exports.PORT = PORT;
const DB_PASSWORD = '87589e57';
exports.DB_PASSWORD = DB_PASSWORD;
const DB_HOST = 'eu-cdbr-west-03.cleardb.net';
exports.DB_HOST = DB_HOST;
const DB_USER = 'b0c20bf719b99a';
exports.DB_USER = DB_USER;
const DB_DATABASE = 'heroku_a018b6f7c278bce';
exports.DB_DATABASE = DB_DATABASE;
//# sourceMappingURL=config.js.map