"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnectionConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
const dbConnectionConfig = {
    DB_HOST: 'eu-cdbr-west-03.cleardb.net',
    DB_PASSWORD: '87589e57',
    DB_DATABASE: 'heroku_a018b6f7c278bce',
    DB_USER: 'b0c20bf719b99a',
};
exports.dbConnectionConfig = dbConnectionConfig;
//# sourceMappingURL=config.js.map