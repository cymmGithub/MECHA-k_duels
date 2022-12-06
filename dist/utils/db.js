"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b0c20bf719b99a',
    password: '87589e57',
    database: 'heroku_a018b6f7c278bce',
    namedPlaceholders: true,
    decimalNumbers: true,
});
//# sourceMappingURL=db.js.map