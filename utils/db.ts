import { createPool } from "mysql2/promise";
import { dbConnectionConfig } from "../config";

export const pool = createPool({
    host: dbConnectionConfig.DB_HOST,
    user: dbConnectionConfig.DB_USER,
    password: dbConnectionConfig.DB_PASSWORD,
    database: dbConnectionConfig.DB_DATABASE,
    namedPlaceholders: true,
    decimalNumbers: true,
});
