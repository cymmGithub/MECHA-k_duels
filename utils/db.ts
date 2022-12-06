import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'b0c20bf719b99a',
    password: '87589e57',
    database: 'heroku_a018b6f7c278bce',
    namedPlaceholders: true,
    decimalNumbers: true,
});
