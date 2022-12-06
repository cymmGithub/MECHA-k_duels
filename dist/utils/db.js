"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: 'localhost',
    user: 'cymm',
    password: '&4hUgrW4LnkcJ5sfV5ogBsTPuYkENA',
    database: 'megak_arena',
    namedPlaceholders: true,
    decimalNumbers: true,
});
//# sourceMappingURL=db.js.map