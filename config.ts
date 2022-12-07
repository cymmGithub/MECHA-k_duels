import * as dotenv from 'dotenv';

dotenv.config();


const PORT = process.env.PORT || 3000;
const DB_PASSWORD = '87589e57';
const DB_HOST = 'eu-cdbr-west-03.cleardb.net';
const DB_USER = 'b0c20bf719b99a';
const DB_DATABASE = 'heroku_a018b6f7c278bce';

export { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE };