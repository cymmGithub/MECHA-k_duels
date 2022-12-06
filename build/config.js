import * as dotenv from 'dotenv';
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;
export const config = {
    server: {
        port: PORT,
    }
};
//# sourceMappingURL=config.js.map