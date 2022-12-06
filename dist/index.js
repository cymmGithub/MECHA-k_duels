"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
require("express-async-errors");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const duel_1 = require("./routers/duel");
const hall_of_fame_1 = require("./routers/hall-of-fame");
const home_1 = require("./routers/home");
const pilot_1 = require("./routers/pilot");
const error_1 = require("./utils/error");
const app = express();
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/', home_1.homeRouter);
app.use('/pilot', pilot_1.PilotRouter);
app.use('/hall-of-fame', hall_of_fame_1.hallOfFameRouter);
app.use('/duel', duel_1.duelRouter);
app.use(error_1.handleError);
app.listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => {
    console.log('Server is running...');
});
//# sourceMappingURL=index.js.map