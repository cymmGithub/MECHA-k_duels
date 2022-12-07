"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
const config_1 = require("../config");
exports.pool = (0, promise_1.createPool)({
    host: config_1.dbConnectionConfig.DB_HOST,
    user: config_1.dbConnectionConfig.DB_USER,
    password: config_1.dbConnectionConfig.DB_PASSWORD,
    database: config_1.dbConnectionConfig.DB_DATABASE,
    namedPlaceholders: true,
    decimalNumbers: true,
});
//# sourceMappingURL=db.js.map