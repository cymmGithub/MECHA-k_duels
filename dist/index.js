import  express from 'express';
import 'express-async-errors';
import * as methodOverride from 'method-override';
import * as cookieParser from 'cookie-parser';
import { duelRouter } from './routers/duel.js';
import { hallOfFameRouter } from './routers/hall-of-fame.js';
import { homeRouter } from './routers/home.js';
import { PilotRouter } from './routers/pilot.js';
import { handleError } from './utils/error.js';
const app = express();
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/', homeRouter);
app.use('/pilot', PilotRouter);
app.use('/hall-of-fame', hallOfFameRouter);
app.use('/duel', duelRouter);
app.use(handleError);
app.listen(3000, 'localhost', () => {
    console.log('Listening on http://localhost:3000');
});
//# sourceMappingURL=index.js.map